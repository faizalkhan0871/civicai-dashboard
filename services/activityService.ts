import api from "@/lib/api";

export const getRecentActivity = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/complaints/activity", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};