import api from "@/lib/api";

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  reply: string;
};

export const sendChatMessage = async (
  message: string,
  history: ChatHistoryItem[]
): Promise<ChatResponse> => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/ai/chat",
    {
      message,
      history,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};