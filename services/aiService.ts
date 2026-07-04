import api from "@/lib/api";

export interface AIAnalysisResponse {
  summary: string;
  riskLevel: "Low" | "Medium" | "High";
  topIssues: string[];
  keyFindings: string[];
  recommendedActions: string[];
}

export const analyzeComplaintsWithAI =
  async (): Promise<AIAnalysisResponse> => {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/ai/analyze",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };