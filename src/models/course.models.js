// models/Course.js
import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  // thumbnailUrl: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: [{
    subtitle: String,
    type: { type: String, enum: ["video", "pdf", "text"] },
    url: String,
  }],
  price: Number,
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export const Course = mongoose.model("Course", courseSchema);

