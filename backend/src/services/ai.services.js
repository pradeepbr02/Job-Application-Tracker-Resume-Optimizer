import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (resumeText, jobDescription) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
You are an ATS resume analyzer.

Return ONLY a JSON object with:
- strengths (array)
- weaknesses (array)
- missingSkills (array)
- suggestions (array)
- matchScore (0-100)

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Invalid JSON from Gemini");
  }

  return JSON.parse(jsonMatch[0]);
};
