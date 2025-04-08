import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


export const signup=asyncHandler(async (req,res)=>{

    const {username,email,password,fullName}=req.body;

    if([username,email,password,fullName].some((field)=>field?.trim()===""))
    {
        throw new ApiError(400,"All Fields are Required");
    }
    
    // Added await here
    const existUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existUser){
        throw new ApiError(409,"User Already Exists");
    }

    const user = await User.create({
        username,
        email,
        password,
        fullName
    });
    
    // Added await and fixed the query to use findById
    const createdUser = await User.findById(user._id).select("-password")
    
    // Made status codes consistent
    return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
})