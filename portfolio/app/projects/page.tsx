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
// Custom component for Demo Alert
function DemoAlert() {
  return (
    <div className="p-4 bg-white text-yellow-800 rounded-lg">
      <p className="font-medium">To request a demo, please <Link href="/contact" className="text-blue-600">contact me here</Link>.</p>
    </div>
  )
}
const categories = ["All", "Web Apps", "Mobile", "Open Source", "AI", "IoT"]
const projects: Project[] = [
  {
    title: "Modern Portfolio Website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS",
    category: "Web Apps",
    image: "/assets/portfolio.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI", "Framer Motion"],
    github: "https://github.com/Nrad8394/MyNewPortfolio.git",
    demo: "https://demo.com",
    details:
      "A fully responsive portfolio website with modern design, animations, and interactive features. Includes a blog, project showcase, and contact form.",
  },
  {
    title: "Harmosoft Book Store",
    description: "A full-stack e-commerce solution with real-time inventory management",
    category: "Web Apps",
    image: "/assets/bookstore.png",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Mpesa Payment Gateway", "Django Rest Framework"],
    github: "https://github.com/Nrad8394/Harmosoft-Book-Store-Frontend.git",
    demo: "https://harmosoftbookstore.co.ke/",
    details:
      "Built a scalable e-commerce platform with features including real-time inventory tracking, secure payment processing, and an intuitive admin dashboard.",
  },
  {
    title: "Class Attendance System",
    description: "A comprehensive system for managing attendance with geolocation-based verification, real-time tracking, and role-based access",
    category: "Web Apps",
    image: "/assets/attendance.png",
    tech: ["Next.js", "Django", "TypeScript", "Tailwind CSS", "GraphQL", "Redis", "WebSocket", "dlib", "Firebase"],
    github: "https://github.com/yourusername/class-attendance-system",
    demo: null,
    details:"Developed a fully functional Class Attendance System that integrates geolocation-based verification for students, facial recognition authentication for attendance signing, and real-time data processing using WebSockets. The system includes role-based access control with specific functionalities for students, lecturers, Heads of Departments (HoD), and the Departmental Professors (DP) for tracking attendance and generating reports. The platform also supports features like dynamic timetable management, integration with Mpesa for payment processing, and advanced reporting tools for tracking class and department-wide attendance, CAT conformance, and timetable adherence. The mobile app supports attendance signing via GPS/Wi-Fi for students and manual sign-ins by lecturers. Facial recognition ensures students can sign in even without their personal devices.",
  },
  {
    title: "Daraja Django Package Module",
    description: "A Django package to integrate Mpesa PayBill and STK endpoints for easy payment processing",
    category: "Open Source",
    image: "/assets/stk.png",
    tech: ["Django", "Python", "Mpesa API", "REST API", "Celery"],
    github: "https://github.com/yourusername/daraja-django-package",
    demo: null,
    details:
      "Developed an open-source Django package module that integrates the Mpesa PayBill API and provides a ready-to-use STK endpoint for seamless payment processing. The package simplifies integrating Mpesa payments into any Django application, with support for both PayBill and the STK push payment methods. Also includes easy configuration, error handling, and background task management using Celery.",
  },
  {
    title: "Tovu Sacco Web app",
    description: "A community savings and credit cooperative web application",
    category: "Web Apps",
    image: "/assets/tovuweb.png",
    tech: ["Next.js", "OpenAI", "WebSocket", "Redis"],
    github: "https://github.com",
    demo: "https://tovusacco.org/",
    details:
      "Designed and developed a comprehensive Web app for financial operations management.",
  },
  {
    title: "Stellar Physio Wellness app",
    description: "stepping up the game in physiotherapy",
    category: "Mobile",
    image: "/assets/stellar.jpeg",
    tech: ["React Native", "GraphQL", "Node.js", "PostgreSQL"],
    github: "https://github.com/Community-Guardian/StellarPysio.git",
    demo: null,
    details:
      "StellarPysio is a comprehensive platform designed to provide advanced data analysis, visualization, and management tools for physiological data. It includes functionalities for user authentication, service management, payment processing, appointment scheduling, notifications, logging, feedback collection, and more.",
  },
  // New projects
  {
    title: "Community Guardian Mobile App",
    description: "Mobile app for community engagement to reduce crime",
    category: "Mobile",
    image: "/assets/community.jpeg",
    tech: ["React Native", "Node.js", "Firebase", "Push Notifications"],
    github: "https://github.com/Community-Guardian/CommunityGuardian-Frontend.git",
    demo: null,
    details:
      "Designed an app focused on community engagement with anonymous reporting, emergency alerts, and real-time updates from local law enforcement.",
  },
  {
    title: "Immunity Shield Intrusion Detection System",
    description: "AI-based intrusion detection system for endpoint security",
    category: "AI",
    image: "/assets/placeholder.svg",
    tech: ["Python", "Machine Learning", "TensorFlow", "Scikit-Learn"],
    github: "https://github.com/Jkuat-CyberSecurity-2024/AIThreatDetection.git",
    demo: null,
    details:
      "Built an advanced intrusion detection system (IDS) using machine learning algorithms to detect and isolate potential threats, improving cybersecurity measures.",
  },
  {
    title: "CarIgnition Vehicle Security Prototype",
    description: "IoT-based prototype for vehicle security and automation",
    category: "IoT",
    image: "/assets/remote car ignition.jpeg",
    tech: ["IoT", "Node.js", "Bluetooth", "Encryption"],
    github: "https://github.com/REMOTE-CAR-IGNITION/RemoteCarIgnition-Frontend.git",
    demo: null,
    details:
      "Developed an IoT-based prototype to remotely start and secure vehicles, enhancing vehicle security with encrypted communication channels.",
  },
  {
    title: "Swift Traders Mobile App",
    description: "Educational mobile app for financial literacy and trading skills",
    category: "Mobile",
    image: "/assets/swift.png",
    tech: ["React Native", "Redux", "Firebase", "Chart.js"],
    github: "https://github.com/Community-Guardian/SwiftFrontend.git",
    demo: null,
    details:
      "Developed a mobile app aimed at enhancing financial literacy and trading skills, helping users understand investment strategies.",
  },
];


export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)  // Open dialog by setting the selected project
  }

  const handleRequestDemo = (projectTitle: string) => {
    alert(`Please request a demo for the project: ${projectTitle}`);
  }

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
          {filteredProjects.map((project, index) => (
            <AnimatePresence key={project.title} mode="popLayout">
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onSelect={handleProjectSelect}  // Use handleProjectSelect here
              />
            </AnimatePresence>
          ))}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-2xl overflow-y-auto max-h-[80vh]"> {/* Allowing scroll on dialog content */}
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
                  {selectedProject.demo ? (
                    <Button asChild className="flex-1 sm:flex-none">
                      <Link
                        href={selectedProject.demo || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        View Demo
                        <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  ) : (
                    <DemoAlert />
                  )}
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