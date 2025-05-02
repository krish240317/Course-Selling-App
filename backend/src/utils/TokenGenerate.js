import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: "2m"
        }

    );
};


const generateAccessAndRefreshToken = async (user) => {
    try {
        const accessToken = generateAccessToken(user);

        return { accessToken };
    } catch {
        throw new ApiError(
            500,
            "Something went wrong while generating acccess tolken "
        );
    }
};
export { generateAccessAndRefreshToken };