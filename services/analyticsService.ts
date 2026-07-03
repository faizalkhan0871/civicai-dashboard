import api from "@/lib/api";

export const getAnalytics = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/complaints/analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};