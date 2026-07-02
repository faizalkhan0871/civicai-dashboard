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
export const updateComplaint = async (
  id: string,
  complaintData: any
) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/complaints/${id}`,
    complaintData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteComplaint = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/complaints/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};