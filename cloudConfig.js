const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLUDE_NAME,
    api_key: process.env.CLUDE_API_KEY,

    api_secret: process.env.CLUDE_API_SECRET
});

const storage = CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedformats: ["png","jpg","jpeg"],
    },
  });

  module.exports={
    cloudinary,
    storage
  };