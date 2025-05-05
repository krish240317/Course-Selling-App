import { asyncHandler } from '../../utils/asyncHandler.js';
import { Course } from '../../models/course.models.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import cloudinary from 'cloudinary';
import { User } from '../../models/user.models.js';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const addContent = asyncHandler(async (req, res) => {
  try {
    const { subtitle, title, description, category, price } = req.body;
    const instructorId = req.user._id;

    const videoFile = req.files?.video?.[0];
    const imageFile = req.files?.image?.[0];

    if (!videoFile || !imageFile) {
      return res
        .json(new ApiResponse(400, null, 'Both video and image files are required.'));
    }

    // Upload video to AWS S3
    const videoFileName = Date.now() + '-' + videoFile.originalname;
    const videoParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `videos/${videoFileName}`,
      Body: videoFile.buffer,
      ContentType: videoFile.mimetype,
    };

    let videoUrl;
    try {
      await s3Client.send(new PutObjectCommand(videoParams));
      videoUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/videos/${videoFileName}`;
    } catch (uploadError) {
      console.error('Error uploading video to S3:', uploadError);
      return res
        .json(new ApiResponse(500, null, 'Failed to upload video to S3'));
    }

    // Upload image to Cloudinary
    const uploadImageToCloudinary = (imageBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: "uploads",
          },
          (error, result) => {
            if (error) {
              return reject(new Error('Failed to upload image to Cloudinary'));
            }
            resolve(result.secure_url); // Resolve the secure URL
          }
        );
        uploadStream.end(imageBuffer);
      });
    };

    let imageUrl;
    try {
      imageUrl = await uploadImageToCloudinary(imageFile.buffer);
    } catch (imageUploadError) {
      console.error('Error uploading image to Cloudinary:', imageUploadError);
      return res
        .json(new ApiResponse(500, null, 'Failed to upload image to Cloudinary'));
    }

    // Create the course with content included
    let addedCourse;
    try {
      addedCourse = await Course.create({
        title,
        description,
        category,
        price,
        instructor: instructorId,
        content: [
          {
            subtitle,
            type: 'video',
            url: videoUrl,
          },
        ],
        thumbnailUrl: imageUrl, // Save the Cloudinary image URL
      });
    } catch (creationError) {
      console.error('Error creating course:', creationError);
      return res
        .json(new ApiResponse(500, null, 'Failed to create course with content'));
    }

    // Update the instructor's createdCourses
    try {
      await User.findByIdAndUpdate(
        instructorId,
        { $addToSet: { createdCourses: addedCourse._id } }, // Use $addToSet to avoid duplicates
        { new: true }
      );
    } catch (userUpdateError) {
      console.error('Error updating user createdCourses:', userUpdateError);
      return res
        .json(new ApiResponse(500, null, 'Failed to update user createdCourses'));
    }

    return res.json(
      new ApiResponse(200, addedCourse, 'Successfully added course with video and image content')
    );
  } catch (error) {
    console.error('Error in addContent:', error);
    return res
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});