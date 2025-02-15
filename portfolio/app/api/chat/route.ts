import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // Change to OpenRouter key
  baseURL: "https://openrouter.ai/api/v1", // Change base URL
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // ✅ Correct Model ID
      stream: false,
      messages: [
        { role: "system", content: "You are a helpful portfolio assistant." },
        ...messages,
      ],
    });

    return new Response(JSON.stringify(response.choices[0].message), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("An error occurred.", { status: 500 });
  }
}
