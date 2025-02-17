"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Layers, Terminal, BrainCircuit, Briefcase, Trophy, Coffee, Gamepad2, Headphones, Heart, Plane, BookOpen } from "lucide-react";
import { useState } from "react"

const funFacts = [
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "Coffee Connoisseur",
    description: "I’ve consumed more coffee than I’d like to admit.",
    details: "Currently experimenting with different beans and brewing methods, aiming to find the perfect cup that’ll keep me caffeinated and somewhat productive.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Code Whisperer",
    description: "Wrote my first 'Hello, World!' at age 12.",
    details: "It was in BASIC, on a clunky old computer. It took forever to compile, but it sparked a lifelong obsession with making things work on a screen.",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Global Explorer",
    description: "Visited 15 counties in my Country — and counting!",
    details: "I’m a sucker for new experiences, and  tech hubs have been my favorite so far. ",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Book Devourer",
    description: "At least one audio book at any time keeps the boredom away.",
    details: "Sci-fi is my go-to, but I’ll pick up anything that has a cool idea or teaches me something new. From robots to rockets, I’m there. Currently enjoying Nature of a Preditor",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Hackathon Veteran",
    description: "I’ve got a few hackathon Victories under my belt.",
    details: "If there’s an all-nighter involved and a problem to solve, you’ll find me leading a team to victory. Stress and deadlines are my secret weapon.",
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "AI Enthusiast",
    description: "Deep diving into the world of AI.",
    details: "From machine learning models to neural networks, I’m all in. Right now, I’m building an AI-driven anomaly detection system (aka, my ‘tech brainchild’).",
  },
]
const hobbies = [
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: "Gaming Guru",
    description: "Indie games are my jam, and I’m always dreaming up my next big game idea. Also, I love watching game streamers for tips and inspiration.",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Beat Maker & DJ",
    description: "When I’m not coding, I’m mixing music with Virtual DJ. I live for creating beats and crafting the perfect transitions for a great mix.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Open Source Contributor",
    description: "I believe in the power of the community — pushing code and ideas to help make the digital world a better place.",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Freelance Hustler",
    description: "I work with startups and businesses, transforming their ideas into digital solutions — all from the comfort of my own desk.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "UI/UX Enthusiast",
    description: "I live and breathe user experience. Crafting interfaces that are both beautiful and intuitive is my passion.",
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Script Wizard",
    description: "I automate everything I can. If it’s repetitive, I’m writing a script to make it disappear.",
  },
]


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
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            I'm a passionate full-stack developer with a love for creating beautiful and functional web applications.
            With over 3 years of experience in web and Mobile Full stack development, I specialize in building modern, responsive, and
            user-friendly applications. I believe great development isn’t just about code, but about solving problems
            with innovative solutions.
          </p>

          <div className={`transition-all duration-500 ${expandedBio ? "max-h-[500px]" : "max-h-0"} overflow-hidden`}>
            <p className="text-lg text-muted-foreground">
              My journey in tech started when I built my first vanilla html,css and js website. Since then, I've worked
              with startups and established companies, helping them bring their ideas to life through code. I'm
              particularly interested in the intersection of design and development, creating experiences that are
              both beautiful and functional. When I'm not coding, I'm likely exploring the latest design trends or
              building fun side projects!
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => setExpandedBio(!expandedBio)}
            className="mt-4 text-lg font-semibold text-primary-500 hover:text-primary-600"
          >
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

