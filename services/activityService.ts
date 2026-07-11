import api from "@/lib/api";
import { getToken } from "@/lib/auth";
export const getRecentActivity = async () => {
  const token = getToken();

  const response = await api.get("/complaints/activity", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};