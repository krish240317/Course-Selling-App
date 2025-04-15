import React from 'react';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { Course } from '../../models/course.models.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import B2 from 'backblaze-b2';
import FormData from 'form-data';
import axios from 'axios';
import { Buffer } from 'buffer'; 

export const addcourse = asyncHandler(async (req, res) => {
  try {
    const InstructorId = req.user._id;
    const { title, description, category, price } = req.body;

    const addedcourse = await Course.create({
      title,
      description,
      category,
      price,
      instructor: InstructorId,
    });

    const confirm = await Course.findById(addedcourse._id);

    return res.json(
      new ApiResponse(200, confirm, 'title,description,category added Successfully')
    );
  } catch (error) {
    console.error('Error adding course:', error);
    return res.status(500).json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export const addContent = asyncHandler(async (req, res) => {
  try {
    const { subtitle } = req.body;
    console.log(subtitle);
    const instructorId = req.user._id;
    const file = req.file;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileName = Date.now() + '-' + file.originalname;

    // Prepare form data for PixelDrain
    const form = new FormData();
    form.append('file', file.buffer, {
      filename: fileName,
      contentType: file.mimetype,
    });

    let response;
    console.log("KEY",process.env.PIXELDRAIN_API_KEY);
    try {
      response = await axios.post('https://pixeldrain.com/api/file', form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Basic ${Buffer.from(`:${process.env.PIXELDRAIN_API_KEY}`).toString('base64')}`,        },
      });
    } catch (uploadError) {
      console.error('Error uploading file to PixelDrain:', uploadError);
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Failed to upload file to PixelDrain'));
    }

    const pixeldrainId = response.data.id;
    const fileLink = `https://pixeldrain.com/u/${pixeldrainId}`;

    let course;
    try {
      course = await Course.findOne({ instructor: instructorId });
      if (!course) {
        throw new Error('Course not found');
      }
    } catch (findError) {
      console.error('Error finding course:', findError);
      return res.status(404).json(new ApiResponse(404, null, 'Course not found'));
    }

    let updatedCourse;
    try {
      updatedCourse = await Course.findByIdAndUpdate(
        course._id,
        {
          $push: {
            content: {
              subtitle,
              type: 'video',
              url: fileLink,
            },
          },
        },
        { new: true }
      );
    } catch (updateError) {
      console.error('Error updating course:', updateError);
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Failed to update course content'));
    }

    return res.json(
      new ApiResponse(200, fileLink, updatedCourse, 'Successfully added video')
    );
  } catch (error) {
    console.error('Error in addContent:', error);
    return res.status(500).json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});