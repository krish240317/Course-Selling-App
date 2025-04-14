import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true , require: true},
  password: {type:String, require: true}, 
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // if instructor
  createdAt: { type: Date, default: Date.now }
});



export const User = mongoose.model("User", userSchema);

