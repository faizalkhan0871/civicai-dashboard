import api from "@/lib/api";

export const getComplaints = async () => {
  const response = await api.get("/complaints");
  return response.data;
};

export const createComplaint = async (complaintData: any) => {
  const response = await api.post("/complaints", complaintData);
  return response.data;
};

export const updateComplaint = async (
  id: string,
  complaintData: any
) => {
  const response = await api.put(
    `/complaints/${id}`,
    complaintData
  );

  return response.data;
};

export const deleteComplaint = async (id: string) => {
  const response = await api.delete(`/complaints/${id}`);
  return response.data;
};

export const getRecentActivity = async () => {
  const response = await api.get("/complaints/activity");
  return response.data;
};