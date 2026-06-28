import api from "@/lib/api";

export const getComplaints = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/complaints", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};