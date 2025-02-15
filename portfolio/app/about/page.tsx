"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Layers, Terminal, BrainCircuit, Briefcase, Trophy, Coffee, Gamepad2, Headphones, Heart, Plane, BookOpen } from "lucide-react";
import { useState } from "react"

const funFacts = [
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "Coffee Enthusiast",
    description: "I've tried over 50 different coffee beans from around the world",
    details: "Currently on a quest to find the perfect espresso blend!",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "First Line of Code",
    description: "Wrote my first program at age 12",
    details: "It was a simple calculator in BASIC, and I've been hooked ever since!",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Travel Bug",
    description: "Visited 15 countries and counting",
    details: "My favorite destination so far has been Japan's tech scene!",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Avid Reader",
    description: "I read at least one book every month",
    details: "My favorite genre is sci-fi, but I also enjoy tech books.",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Hackathon Winner",
    description: "Won multiple hackathons in software development",
    details: "Building innovative solutions under pressure is my forte.",
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "AI Enthusiast",
    description: "Exploring AI-driven applications in cybersecurity and automation",
    details: "Currently working on a machine-learning-powered anomaly detection system.",
  },
];

const hobbies = [
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: "Gaming",
    description: "Passionate about indie games and game development",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Music Production",
    description: "Creating electronic music in my free time",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Open Source",
    description: "Contributing to community projects",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Freelancing",
    description: "Helping startups and businesses build digital solutions",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "UI/UX Design",
    description: "Designing intuitive user interfaces and experiences",
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Automation",
    description: "Building scripts and tools to automate workflows",
  },
];


export default function AboutPage() {
  const [expandedBio, setExpandedBio] = useState(false)

  return (
    <main className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              I'm a passionate full-stack developer with a love for creating beautiful and functional web applications.
              With over 5 years of experience in web development, I specialize in building modern, responsive, and
              user-friendly applications.
            </p>
            <div className={`transition-all duration-500 ${expandedBio ? "max-h-[500px]" : "max-h-0"} overflow-hidden`}>
              <p className="text-lg text-muted-foreground">
                My journey in tech started when I built my first website for a local business. Since then, I've worked
                with startups and established companies, helping them bring their ideas to life through code. I'm
                particularly interested in the intersection of design and development, creating experiences that are
                both beautiful and functional.
              </p>
            </div>
            <Button variant="ghost" onClick={() => setExpandedBio(!expandedBio)} className="mt-4">
              {expandedBio ? "Read Less" : "Read More"}
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Fun Facts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {funFacts.map((fact, index) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative h-full overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {fact.icon}
                      <CardTitle>{fact.title}</CardTitle>
                    </div>
                    <CardDescription>{fact.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{fact.details}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Hobbies & Interests</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {hobby.icon}
                      <CardTitle>{hobby.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{hobby.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </main>
  )
}

