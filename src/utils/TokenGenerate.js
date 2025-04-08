import  jwt  from "jsonwebtoken";

export const generateAccessToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,   
            email:user.email
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:"20m"
        }
        
    );
};