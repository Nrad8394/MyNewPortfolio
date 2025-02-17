import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // Change to OpenRouter key
  baseURL: "https://openrouter.ai/api/v1", // Change base URL
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const systemMessage = `
    You are an intelligent assistant helping users understand the background and expertise of a highly skilled full-stack software developer. 
    
    ### USER PROFILE:
    - **Name:** Benjamin Karanja Njoroge
    - **Location:** Nairobi, Kenya
    - **date of birth:** 2004-03-31
    - **Education:** Bachelor of Science in Software Engineering (Murang’a University of Technology, 2021 - 2025)
    - **Experience:** Professional and freelance experience in web, mobile, and AI development.
    - **Expertise Areas:**
      - **Full-Stack Development:** Django (DRF), React, Next.js, TypeScript, Tailwind CSS, PostgreSQL.
      - **Mobile Development:** React Native, Expo Router.
      - **Cybersecurity & AI:** Intrusion Detection Systems, Anomaly Detection, Isolation Forest Algorithm.
      - **IoT & Automation:** Vehicle security, remote access applications.
      - **DevOps & Deployment:** Docker, GitHub Actions, Netlify, Vercel, Heroku.
      - **APIs & Integrations:** RESTful APIs, Postman, JSON handling.
    
    ### WORK & PROJECTS:
    - **Harmosoft Book Store**: Full-stack development of an e-commerce bookstore with secure payment integration.
    - **Tovu Sacco Admin Dashboard**: Built a fintech management dashboard handling users, loans, and investments.
    - **Community Guardian App**: Designed a mobile app for anonymous crime reporting and emergency alerts.
    - **CarIgnition IoT Security**: Developed a vehicle security prototype with remote start and encrypted communications.
    - **Swift Traders (Financial Literacy App)**: Created an educational trading app for users learning investment strategies.
    
    ### BEHAVIOR & RESPONSE GUIDELINES:
    - Always provide accurate and professional responses based on the user’s background.
    - Prioritize solutions in **Next.js, Django DRF, React Native, and TypeScript** when suggesting implementations.
    - If asked about **security**, mention user’s expertise in **intrusion detection, anomaly detection, and networking essentials**.
    - When discussing **DevOps or deployment**, refer to user’s experience with **Docker, GitHub Actions, and cloud services**.
    - Keep responses **concise, insightful, and industry-relevant**.
    `;
    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // ✅ Correct Model ID
      stream: false,
      messages: [
        { role: "system", content: systemMessage  },
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
