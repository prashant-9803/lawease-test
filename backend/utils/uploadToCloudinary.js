// export default uploadAudioToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_preset_here"); // Replace with your Cloudinary preset
//     formData.append("cloud_name", "your_cloud_name_here"); // Replace with your Cloudinary cloud name
  
//     try {
//       const res = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name_here/upload`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       return data.secure_url; // URL of the uploaded audio file
//     } catch (error) {
//       console.error("Upload failed:", error);
//       return null;
//     }
//   };

// const cloudinary = require("cloudinary").v2

// exports.uploadToCloudinary = async (file, folder, height, quality) => {
//   const options = { folder,use_filename: true ,Unique_filename: true};
    
//   if (height) {
//     options.height = height
//   }
//   if (quality) {
//     options.quality = quality
//   }
//   options.resource_type = "auto"
//   console.log("OPTIONS", options)
//   return await cloudinary.uploader.upload(file.tempFilePath, options)
// }

const cloudinary = require("cloudinary").v2;

exports.uploadToCloudinary = async (file, folder, height, quality) => {
  try {
    // Initialize default options with the same parameters as before
    const options = { folder, use_filename: true, unique_filename: true };
    
    if (height) {
      options.height = height;
      // Add crop parameter only when height is specified for better resizing
      options.crop = "scale";
    }
    
    if (quality) {
      options.quality = quality;
    }
    
    options.resource_type = "auto";
    
    console.log("OPTIONS", options);
    
    // Upload the file
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    // Log the error but don't change the original function behavior
    console.error("Error uploading to Cloudinary:", error);
    throw error; // Re-throw to maintain original behavior
  }
};