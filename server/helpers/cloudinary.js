const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dixhlvyjm",
  api_key: "887373243926431",
  api_secret: "xfOMzixYWp_gIRjl4P8V32z6tFU",
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });
module.exports = { upload, imageUploadUtils };
