import axios from "axios";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/itaqno4p/image/upload";

async function saveImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", "library_covers");
  formData.append("upload_preset", "library_system");

  const response = await axios.post(cloudinaryURL, formData, {
    headers: { "x-auth-token": undefined },
  });

  return response.data.secure_url;
}

export default { saveImage };
