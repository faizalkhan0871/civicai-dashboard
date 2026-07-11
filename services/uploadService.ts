import axios from "axios";
import { getToken } from "@/lib/auth";
export const uploadComplaintImage = async (imageFile: File) => {
 const token = getToken();
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