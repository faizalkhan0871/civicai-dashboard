import api from "@/lib/api";
import { getToken } from "@/lib/auth";
export const getAnalytics = async () => {
  const token = getToken();

  const response = await api.get("/complaints/analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};