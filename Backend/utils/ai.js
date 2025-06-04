import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets.

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
  });

  const response = await supportAgent.run(
    `You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.\n\nAnalyze the following support ticket and provide a JSON object with:\n\n- summary: A short 1-2 sentence summary of the issue.\n- priority: One of \"low\", \"medium\", or \"high\".\n- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.\n- relatedSkills: An array of relevant skills required to solve the issue (e.g., [\"React\", \"MongoDB\"]).\n\nRespond ONLY in this JSON format and do not include any other text or markdown in the answer:\n\n{\n  \"summary\": \"Short summary of the ticket\",\n  \"priority\": \"high\",\n  \"helpfulNotes\": \"Here are useful tips...\",\n  \"relatedSkills\": [\"React\", \"Node.js\"]\n}\n\n---\n\nTicket information:\n\n- Title: ${ticket.title}\n- Description: ${ticket.description}`
  );

  console.log("AI full response", response);

  const raw =
    response?.output?.[0]?.content || response?.output?.[0]?.context || response?.output?.[0]?.value || "";
  console.log("raw", raw);

  if (!raw || raw.trim() === "") {
    console.error("❌ AI returned an empty response. Check your API key, model, and ticket data.");
    return null;
  }

  try {
    const trimmed = raw.trim();

    // If it's wrapped in ```json ... ``` or ``` ... ```
    const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : trimmed;

    const parsed = JSON.parse(jsonString);
    console.log("parse", parsed);

    return parsed;
  } catch (e) {
    console.error("❌ Failed to parse JSON from AI response:", e.message);
    console.log("📨 Raw AI response was:", raw);
    return null;
  }
};

export default analyzeTicket;