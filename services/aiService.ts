import api from "@/lib/api";

export interface AIAnalysisResponse {
  summary: string;
  riskLevel: "Low" | "Medium" | "High";
  topIssues: string[];
  keyFindings: string[];
  recommendedActions: string[];
}
export interface ComplaintAnalysis {
  category: string;
  priority: "Low" | "Medium" | "High";

  severityScore: number;

  riskLevel: string;

  responseTime: string;

  citizenImpact: string;

  department: string;

  summary: string;

  suggestedActions: string[];

  tags: string[];
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
  export interface PriorityRecommendation {
  priority: "Low" | "Medium" | "High";
  reason: string;
}

export const recommendComplaintPriority = async (
  title: string,
  description: string
): Promise<PriorityRecommendation> => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/ai/recommend-priority",
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const analyzeComplaint = async (
  title: string,
  description: string
): Promise<ComplaintAnalysis> => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/ai/analyze-complaint",
    {
      title,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};