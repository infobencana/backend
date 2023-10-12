const util = require("util");
const gc = require("../config/gcs.config");
const bucket = gc.bucket(process.env.GCP_BUCKET_NAME);
const short = require("short-uuid");
const sharp = require("sharp");

const uploadImageProfile = async (file, sanitizedEmail) => {
  const { originalname, buffer } = file;
  const fileExtension = originalname.split(".").pop();
  const uuid = short().new();
  const blobPath = `profile/${sanitizedEmail}_${uuid}.${fileExtension}`;

  const blob = bucket.file(blobPath);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  // Create a Sharp instance and perform image optimization
  const sharpInstance = sharp(buffer);

  // Get the image metadata (width and height)
  const metadata = await sharpInstance.metadata();

  // Check if either the width or height is greater than 100 pixels
  if (metadata.width > 600 || metadata.height > 600) {
    // Calculate the new dimensions while maintaining aspect ratio
    const maxWidth = metadata.width > 600 ? 600 : metadata.width;
    const maxHeight = metadata.height > 600 ? 600 : metadata.height;

    // Resize the image to fit within maxWidth x maxHeight without quality loss
    sharpInstance.resize(maxWidth, maxHeight, {
      fit: "inside",
      withoutEnlargement: true, // Prevent enlargement
    });
  }

  // Optimize the image in a common format (e.g., JPEG) with quality and progressive
  sharpInstance.toFormat("jpeg", {
    progressive: true, // Enable progressive JPEG
    quality: 80, // Adjust quality as needed
  });

  // Pipe the output of Sharp to the blobStream
  sharpInstance.pipe(blobStream);

  // Handle the stream events
  return new Promise((resolve, reject) => {
    blobStream.on("finish", () => {
      const publicUrl = util.format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      );
      resolve(publicUrl);
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    sharpInstance.on("error", (err) => {
      reject(err);
    });
  });
};

const uploadImageDisaster = async (file) => {
  const { originalname, buffer } = file;
  const fileExtension = originalname.split(".").pop();
  const uuid = short().new();
  const blobPath = `disaster/_${uuid}.${fileExtension}`;

  const blob = bucket.file(blobPath);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  await blobStream.write(buffer);
  await blobStream.end();

  const publicUrl = util.format(
    `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
  );

  return publicUrl;
};

module.exports = {
  uploadImageProfile,
  uploadImageDisaster,
};
