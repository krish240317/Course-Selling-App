import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


// dotenv.config({
//     path: './env'
// })

const connectDb=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
export default connectDb;