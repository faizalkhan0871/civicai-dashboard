import api from "@/lib/api";

export const uploadComplaintImage = async (
  imageFile: File
) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
