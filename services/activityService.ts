import api from "@/lib/api";

export const getRecentActivity = async () => {
  const response = await api.get("/complaints/activity");

  return response.data;
};