const cloudinary = require("../config/cloudinary");

const deleteCloudinaryImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const parts = imageUrl.split("/upload/");

    if (parts.length < 2) return;

    let publicId = parts[1];

    // Remove version folder (v123456...)
    publicId = publicId.replace(/^v\d+\//, "");

    // Remove file extension
    publicId = publicId.replace(/\.[^/.]+$/, "");

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Cloudinary delete result:", result);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
};

module.exports = {
  deleteCloudinaryImage,
};