"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: "welcome", role: "assistant", content: "Hi! I'm your portfolio assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    const newMessages = [...messages, { id: Date.now().toString(), role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const systemMessage = `
      You are an intelligent assistant specializing in answering questions about the user's background, expertise, and projects.
      Provide concise, engaging, and industry-relevant responses. Tailor technical solutions to Next.js, Django DRF, React Native, and TypeScript when applicable.
      For unrelated topics, maintain a professional and informative tone. Avoid jargon and overly technical language.

      Warm Welcome & Introduction
      "Welcome! I'm here to help you learn more about Benjamin Karanja Njoroge—a passionate full-stack developer from Nairobi. Whether you're curious about his projects, skills, or experience, feel free to ask. Let's explore!"

      USER PROFILE:
      Name: Benjamin Karanja Njoroge
      Location: Nairobi, Kenya
      date of birth: 2004-03-31

      Education: BSc in Software Engineering (Murang’a University of Technology, 2021 - 2025)
      Experience: Professional & freelance work in web, mobile, AI, and cybersecurity.
      EXPERTISE:
      Full-Stack Development: Django (DRF), React, Next.js, TypeScript, Tailwind CSS, PostgreSQL.
      Mobile Development: React Native, Expo Router.
      Cybersecurity & AI: Intrusion Detection Systems, Anomaly Detection, Isolation Forest Algorithm.
      IoT & Automation: Vehicle security, remote access applications.
      DevOps & Deployment: Docker, GitHub Actions, Netlify, Vercel, Heroku.
      APIs & Integrations: RESTful APIs, Postman, JSON handling.
      NOTABLE PROJECTS:
      Harmosoft Book Store: Full-stack e-commerce bookstore with secure payment integration.
      Tovu Sacco Admin Dashboard: Fintech dashboard for user, loan, and investment management.
      Community Guardian App: Mobile app for anonymous crime reporting and emergency alerts.
      CarIgnition IoT Security: IoT-based vehicle security with encrypted remote start.
      Swift Traders (Financial Literacy App): Educational trading app for investment strategies.
      RESPONSE GUIDELINES:
      Casual & Friendly for greetings like "Hi" or "Hello." or "Hello, how are you?" or "thanks"
      Technical & Precise for coding and project-related inquiries.
      Security-Related Topics: Mention expertise in intrusion detection, anomaly detection, and networking essentials.
      DevOps & Deployment: Refer to Docker, GitHub Actions, and cloud services.
      No Unnecessary Repetition: Respond only to what is asked.
    `;

    try {
      const apiKey = "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";
      if (!apiKey) throw new Error("API key is missing. Check your environment variables.");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: input }, // Only send latest input
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        setMessages([...newMessages, { id: Date.now().toString(), role: "assistant", content: data.choices[0].message.content }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-full max-w-sm"
          >
            <Card className="flex h-[500px] flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b p-4">
                <div>
                  <h3 className="text-sm font-medium">Portfolio Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything about the portfolio</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {error && (
                    <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Input
                    ref={inputRef}
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="flex-1"
                    aria-label="Chat message"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
