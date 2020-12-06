import dotenv from 'dotenv';
import cloudinaryMain from 'cloudinary';

dotenv.config()
const cloudinary = cloudinaryMain.v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;