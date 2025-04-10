const { getBase64 } = require('./features');

const cloudinary = require('cloudinary').v2;
const uuid = require('uuid').v4;

exports.uploadImageCloudinary = async (files, folder, height, quality) => {
    const options = { folder };
    if (height) options.height = height;
    if (quality) options.quality = quality;
    options.resource_type = "auto";
    options.public_id = uuid();
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                getBase64(file),
                options,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
        });
    });

    try {
        const res = await Promise.all(uploadPromises);
        // console.log("result", res);
        const formattedResults = res.map((result) => ({
            public_id: result.public_id,
            url: result.secure_url
        }))

        return formattedResults;
    } catch (err) {
        console.log(err);
        throw new Error("Error uploading files to cloudinary", err);
    }
}


exports.deleteImageCloudinary = async (publicId, fileType) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: fileType });
        console.log("Cloudinary Video Delete Response:", result);
        return { result };
    } catch (error) {
        console.error("Error deleting video from Cloudinary:", error);
        return { error: "Failed to delete video" };
    }
}