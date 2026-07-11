import api from "@/lib/api";

export const getAnalytics = async () => {
  const response = await api.get("/complaints/analytics");

  return response.data;
};