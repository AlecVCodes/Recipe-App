require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "deewhii9n",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
  secure: true,
});

const image = "../frontend/src/images/Chicken-Tikka-Misala-large.png";
cloudinary.uploader.upload(image).then((result) => {
  console.log(result);
});
 