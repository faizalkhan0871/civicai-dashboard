import api from "@/lib/api";
import { getToken } from "@/lib/auth";
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
  const token = getToken();
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