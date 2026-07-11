import api from "@/lib/api";

export const getDashboardStats = async () => {
  const response = await api.get("/complaints/stats");

  return response.data;
};