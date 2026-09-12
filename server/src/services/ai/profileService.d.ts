export function generatePlayerProfile(
  inputText: string
): Promise<{
  goals: string[];
  priorities: string[];
  interests: string[];
  aspirations: string[];
  riskTolerance?: "low" | "medium" | "high";
  summary: string;
}>;