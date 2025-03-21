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

const cloudinary = require("cloudinary").v2

exports.uploadToCloudinary = async (file, folder, height, quality, additionalOptions = {}) => {
  try {
    // Initialize default options
    const options = { folder };
    
    if (height) {
      options.height = height;
      options.crop = "scale";
    }
    
    if (quality) {
      options.quality = quality;
    }
    
    // Merge any additional options
    Object.assign(options, additionalOptions);
    
    // Upload the file
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};