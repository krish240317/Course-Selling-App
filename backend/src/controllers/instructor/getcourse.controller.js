import { Course } from "../../models/course.models.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiResponse } from "../../utils/ApiResponse.js";
export const getcourse = asyncHandler( async(req,res) => {
 try{  
    const courses = await Course.find({ instructor: req.user._id });
    res.json(new ApiResponse(200,courses,"Data Get Successfully"))}
    catch(error){
        return res.json(new ApiResponse(500, null, 'Failed to Get courses'));
    }
})

