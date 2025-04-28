import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { generateAccessAndRefreshToken } from '../utils/TokenGenerate.js'
import bcrypt, { compare } from "bcrypt";

export const signup = asyncHandler(async (req, res) => {

    const { name, email, password, role } = req.body;

    if ([name, email, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are Required");
    }

    // Added await here
    const existUser = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (existUser) {
        throw new ApiError(409, "User Already Exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await  User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    // Added await and fixed the query to use findById
    const createdUser = await User.findById(user._id).select("-password")

    // Made status codes consistent
    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User registered Successfully"));
})


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        $and: [{ email }]
    })
    // console.log(user);
    if (!user) {
        throw new ApiError(400, "User not Found Incorrect Email OR Password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken } = await generateAccessAndRefreshToken(user);

    const options = {
        httpOnly: true,
        secure: true,
    };
    const logedInUser = user;
    console.log(accessToken);
    return res
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: logedInUser,
                    accessToken
                },
                "User Loggedin Successfully"
            )
        )

})
export const checkk=async(req,res)=>{
    const users=req.user.email;
    console.log(users)
    res.json(new ApiResponse(200,[users],"OKKKKKKKKKKKKK"));
}