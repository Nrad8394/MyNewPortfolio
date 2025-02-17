"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Boxes,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Layout,
  Server,
  Settings,
  Terminal,
  Type,
  Wind,
  Cloud,
  Cpu,
  ShieldCheck,
  Zap,
  Code,
  BookOpen,
  CpuIcon,
  HardDrive,
  CloudLightning,
  Network,
  Lock,
  Globe2,
  GitCommit,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      {
        name: "React",
        icon: <Layout className="h-8 w-8" />,
        proficiency: 90,
        experience: "3 years",
        projects: "Built 20+ production applications",
      },
      {
        name: "Next.js",
        icon: <Globe className="h-8 w-8" />,
        proficiency: 85,
        experience: "3 years",
        projects: "10+ full-stack applications",
      },
      {
        name: "TypeScript",
        icon: <Type className="h-8 w-8" />,
        proficiency: 90,
        experience: "3 years",
        projects: "Used in all recent projects",
      },
      {
        name: "JavaScript (ES6+)",
        icon: <Code className="h-8 w-8" />,
        proficiency: 95,
        experience: "3 years",
        projects: "Core language for frontend & backend",
      },
      {
        name: "Tailwind CSS",
        icon: <Wind className="h-8 w-8" />,
        proficiency: 90,
        experience: "3 years",
        projects: "15+ styled applications",
      },
      {
        name: "Redux",
        icon: <Zap className="h-8 w-8" />,
        proficiency: 80,
        experience: "3 years",
        projects: "State management for large-scale applications",
      },
      {
        name: "React Native",
        icon: <Globe2 className="h-8 w-8" />,
        proficiency: 80,
        experience: "2 years",
        projects: "Built cross-platform mobile applications",
      },
      {
        name: "ShadCN/UI",
        icon: <BookOpen className="h-8 w-8" />,
        proficiency: 85,
        experience: "1 year",
        projects: "Used for modern UI components",
      },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      {
        name: "Node.js",
        icon: <Server className="h-8 w-8" />,
        proficiency: 85,
        experience: "3 years",
        projects: "Built multiple REST APIs",
      },
      {
        name: "Python",
        icon: <FileCode2 className="h-8 w-8" />,
        proficiency: 85,
        experience: "3 years",
        projects: "Data processing applications",
      },
      {
        name: "Django & DRF",
        icon: <Code2 className="h-8 w-8" />,
        proficiency: 85,
        experience: "3 years",
        projects: "CMS, API development, and e-commerce sites",
      },
      {
        name: "Express.js",
        icon: <Server className="h-8 w-8" />,
        proficiency: 80,
        experience: "3 years",
        projects: "Lightweight and scalable APIs",
      },
      {
        name: "GraphQL",
        icon: <Cloud className="h-8 w-8" />,
        proficiency: 80,
        experience: "2 years",
        projects: "Implemented in multiple applications",
      },
      {
        name: "FastAPI",
        icon: <Cpu className="h-8 w-8" />,
        proficiency: 75,
        experience: "1 year",
        projects: "High-performance APIs",
      },
      {
        name: "REST APIs",
        icon: <CloudLightning className="h-8 w-8" />,
        proficiency: 90,
        experience: "3 years",
        projects: "Extensively used in backend development",
      },
      {
        name: "Celery",
        icon: <Server className="h-8 w-8" />,
        proficiency: 75,
        experience: "1 year",
        projects: "Task queue for background jobs in Django",
      },
    ],
  },
  {
    title: "Database & DevOps",
    skills: [
      {
        name: "PostgreSQL",
        icon: <Database className="h-8 w-8" />,
        proficiency: 85,
        experience: "3 years",
        projects: "Primary database for scalable applications",
      },
      {
        name: "MySQL",
        icon: <Database className="h-8 w-8" />,
        proficiency: 85,
        experience: "3 years",
        projects: "Secondary database for scalable applications",
      },
      {
        name: "MongoDB",
        icon: <Boxes className="h-8 w-8" />,
        proficiency: 80,
        experience: "2 years",
        projects: "NoSQL solutions for dynamic data",
      },
      {
        name: "Redis",
        icon: <CpuIcon className="h-8 w-8" />,
        proficiency: 75,
        experience: "2 years",
        projects: "Used for caching and session management",
      },
      {
        name: "Docker",
        icon: <Settings className="h-8 w-8" />,
        proficiency: 80,
        experience: "2 years",
        projects: "Containerized applications",
      },
      {
        name: "AWS (EC2, S3, RDS)",
        icon: <Terminal className="h-8 w-8" />,
        proficiency: 75,
        experience: "2 years",
        projects: "Cloud infrastructure and deployment",
      },
      {
        name: "Git & GitHub",
        icon: <GitBranch className="h-8 w-8" />,
        proficiency: 95,
        experience: "3 years",
        projects: "Version control and CI/CD integration",
      },
      {
        name: "CI/CD (GitHub Actions, Jenkins)",
        icon: <GitCommit className="h-8 w-8" />,
        proficiency: 75,
        experience: "1 year",
        projects: "Automated testing and deployment",
      },
    ],
  },
  {
    title: "Design & Tools",
    skills: [
      {
        name: "Figma",
        icon: <BookOpen className="h-8 w-8" />,
        proficiency: 85,
        experience: "2 years",
        projects: "UI/UX design for web and mobile apps",
      },
      {
        name: "Canva",
        icon: <BookOpen className="h-8 w-8" />,
        proficiency: 75,
        experience: "2 years",
        projects: "Designing graphics, presentations, and social media content",
      },
      {
        name: "CorelDRAW",
        icon: <BookOpen className="h-8 w-8" />,
        proficiency: 70,
        experience: "1 year",
        projects: "Vector graphics for print and digital designs",
      },
    ],
  },
  {
    title: "Cybersecurity & Infrastructure",
    skills: [
      {
        name: "Network Security",
        icon: <Network className="h-8 w-8" />,
        proficiency: 75,
        experience: "2 years",
        projects: "Secured APIs & infrastructure",
      },
      {
        name: "OWASP Security Practices",
        icon: <ShieldCheck className="h-8 w-8" />,
        proficiency: 80,
        experience: "2 years",
        projects: "Implemented security best practices",
      },
      {
        name: "Linux Server Management",
        icon: <HardDrive className="h-8 w-8" />,
        proficiency: 75,
        experience: "3 years",
        projects: "Configured and managed Ubuntu servers",
      },
      {
        name: "Authentication & Authorization",
        icon: <Lock className="h-8 w-8" />,
        proficiency: 85,
        experience: "3 years",
        projects: "OAuth2, JWT, and role-based access control",
      },
    ],
  },
  {
    title: "Messaging & WebSockets",
    skills: [
      {
        name: "EMQX Message Broker",
        icon: <Cloud className="h-8 w-8" />,
        proficiency: 80,
        experience: "2 years",
        projects: "Built real-time messaging and IoT systems",
      },
      {
        name: "WebSockets",
        icon: <Terminal className="h-8 w-8" />,
        proficiency: 80,
        experience: "2 years",
        projects: "Real-time data communication and live updates",
      },
    ],
  },
];




export default function SkillsPage() {
  return (
    <main className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Skills & Technologies</h1>
          <p className="text-lg text-muted-foreground">A comprehensive overview of my technical skills and expertise</p>
        </section>

        <div className="grid gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <section key={category.title} className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index + categoryIndex * 4} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </main>
  )
}

function SkillCard({ skill, index }: { skill: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {skill.icon}
                  <CardTitle>{skill.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-primary"
                  />
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-2">
              <p>Experience: {skill.experience}</p>
              <p>{skill.projects}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  )
}

