import React from 'react'
import { asyncHandler } from '../../utils/asyncHandler.js';
import {Course} from '../../models/course.models.js'
import { ApiResponse } from '../../utils/ApiResponse.js';

export const addcourse = asyncHandler(async (req, res) => {
  const InstructorId=req.user._id;
  // console.log("J",InstructorId);
  const { title, description, category,price } = req.body;

  const addedcourse=await Course.create({
    title,
    description,
    category,
    price,
    instructor:InstructorId,
  })

  const confirm =await Course.findById(addedcourse._id);

  return res
  .status(200)
  .json(new ApiResponse(200, confirm, "title,description,category added Successfully"));

})

const addContent=asyncHandler(async(req,res)=>{
  const {content,}=req.body;
})