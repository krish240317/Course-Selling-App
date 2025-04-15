import React from 'react'
import { asyncHandler } from '../../utils/asyncHandler.js';
import { Course } from '../../models/course.models.js'
import { ApiResponse } from '../../utils/ApiResponse.js';
import B2 from 'backblaze-b2'


export const addcourse = asyncHandler(async (req, res) => {
  const InstructorId = req.user._id;
  // console.log("J",InstructorId);
  const { title, description, category, price } = req.body;

  const addedcourse = await Course.create({
    title,
    description,
    category,
    price,
    instructor: InstructorId,
  })

  const confirm = await Course.findById(addedcourse._id);

  return res
    .json(new ApiResponse(200, confirm, "title,description,category added Successfully"));
})

export const addContent = asyncHandler(async (req, res) => {

  const { subtitle } = req.body;
  console.log(subtitle);
  const b2 = new B2({
    applicationKeyId: process.env.B2_KEY_ID,
    applicationKey: process.env.B2_APP_KEY,
  });


  const instructorId = req.user._id;
  const file = req.file;
  if (!file) return res.status(400).send('No file uploaded.');

  await b2.authorize();

  const fileName = Date.now() + '-' + file.originalname;

  const { data: uploadUrlData } = await b2.getUploadUrl({
    bucketId: process.env.B2_BUCKET_ID,
  });

  await b2.uploadFile({
    uploadUrl: uploadUrlData.uploadUrl,
    uploadAuthToken: uploadUrlData.authorizationToken,
    fileName: fileName,
    data: file.buffer,
    contentType: file.mimetype,
  });

  // Generate signed URL
  const { data } = await b2.getDownloadAuthorization({
    bucketId: process.env.B2_BUCKET_ID,
    fileNamePrefix: fileName,
    validDurationInSeconds: 3600,
  });

  const signedURL = `https://f000.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}?Authorization=${data.authorizationToken}`;

  const course = await Course.findOne({ instructor: instructorId });
  if (!course) {
    throw new ApiError(404, "Course not found");
  }


  const updatedCourse = await Course.findByIdAndUpdate(
    course._id, // Use the course ID found earlier
    {
      $push: {
        content: {
          subtitle,
          type:"video",
          url: signedURL, // Add the generated URL to the content
        },
      },
    },
    { new: true } // Return the updated course
  );
// ........................................................ Continue from hereeeee
  return res
    .json(new ApiResponse(200, signedURL,updatedCourse, "Successfully added video"));

})