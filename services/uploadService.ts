import axios from "axios";

export const uploadComplaintImage = async (imageFile: File) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post(
    "http://localhost:5000/api/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};