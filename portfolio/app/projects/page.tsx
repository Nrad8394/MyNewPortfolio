"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProjectCard } from "@/components/project-card"
import type { Project } from "@/types"

const categories = ["All", "Web Apps", "Mobile", "Open Source"]

const projects: Project[] = [
  {
    title: "Modern Portfolio Website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS",
    category: "Web Apps",
    image: "/placeholder.svg",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    demo: "https://demo.com",
    details:
      "A fully responsive portfolio website with modern design, animations, and interactive features. Includes a blog, project showcase, and contact form.",
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management",
    category: "Web Apps",
    image: "/placeholder.svg",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    github: "https://github.com",
    demo: "https://demo.com",
    details:
      "Built a scalable e-commerce platform with features including real-time inventory tracking, secure payment processing, and an intuitive admin dashboard.",
  },
  {
    title: "Task Management App",
    description: "Mobile-first task management application with collaborative features",
    category: "Mobile",
    image: "/placeholder.svg",
    tech: ["React Native", "Redux", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    details: "Developed a cross-platform mobile application for task management with real-time collaboration features.",
  },
  {
    title: "Open Source UI Library",
    description: "A collection of reusable React components with accessibility in mind",
    category: "Open Source",
    image: "/placeholder.svg",
    tech: ["React", "TypeScript", "Storybook", "Jest"],
    github: "https://github.com",
    demo: "https://demo.com",
    details:
      "Created and maintained a popular open-source UI component library focusing on accessibility and developer experience.",
  },
  {
    title: "AI-Powered Chat Application",
    description: "Real-time chat application with AI-powered features",
    category: "Web Apps",
    image: "/placeholder.svg",
    tech: ["Next.js", "OpenAI", "WebSocket", "Redis"],
    github: "https://github.com",
    demo: "https://demo.com",
    details:
      "Built a modern chat application with AI features like smart replies, sentiment analysis, and language translation.",
  },
  {
    title: "Fitness Tracking Mobile App",
    description: "Cross-platform fitness tracking application with social features",
    category: "Mobile",
    image: "/placeholder.svg",
    tech: ["React Native", "GraphQL", "Node.js", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
    details:
      "Developed a comprehensive fitness tracking app with workout plans, progress tracking, and social sharing features.",
  },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  return (
    <main className="container py-12" id="main-content">
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="text-lg text-muted-foreground">A showcase of my recent work and contributions</p>
        </section>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} onSelect={setSelectedProject} />
            ))}
          </AnimatePresence>
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={`Screenshot of ${selectedProject.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">{selectedProject.details}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild className="flex-1 sm:flex-none">
                    <Link
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      View Demo
                      <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 sm:flex-none">
                    <Link
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                      <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>

        {filteredProjects.length === 0 && (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}

