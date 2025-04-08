import mongoose,{Schema} from "mongoose";


const userSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        index:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
      },
      fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
})

export const User=mongoose.model("User",userSchema);

