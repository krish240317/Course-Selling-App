import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {generateAccessToken} from '../utils/TokenGenerate.js'

export const signup = asyncHandler(async (req, res) => {

    const { username, email, password, fullName } = req.body;

    if ([username, email, password, fullName].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are Required");
    }

    // Added await here
    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser) {
        throw new ApiError(409, "User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName
    });

    // Added await and fixed the query to use findById
    const createdUser = await User.findById(user._id).select("-password")

    // Made status codes consistent
    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User registered Successfully"));
})



// const generateAccessToken=(user_id)=>{
// //     const 
// // }


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        $and: [{ email }]
    })
    if (!user) {
        throw new ApiError(400, "User not Found Incorrect Email OR Password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken } = generateAccessToken(user);
})