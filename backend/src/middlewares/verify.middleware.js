import jwt from "jsonwebtoken"

import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJwt = asyncHandler( async(req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorise Request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
        const userId = decodedToken?.id;
        console.log("UserId",userId)
        const user = await User.findOne(  { _id:userId });
        if (!user) {
            throw new ApiError(400, "Invalid Access Token");
        }
        req.user = user
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})