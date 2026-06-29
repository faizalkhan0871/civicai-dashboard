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

export const createComplaint = async (complaintData: any) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/complaints", complaintData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};