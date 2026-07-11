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
  const response = await api.post("/ai/chat", {
    message,
    history,
  });

  return response.data;
};