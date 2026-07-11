import api from "@/lib/api";
import { getToken } from "@/lib/auth";
export const getDashboardStats = async () => {
  const token = getToken();

  const response = await api.get("/complaints/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};