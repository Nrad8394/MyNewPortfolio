"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import type { TimelineItem } from "@/types"
import { link } from "fs"

const timelineItems: TimelineItem[] = [
  {
    id: "1",
    title: "Bachelor of Science in Software Engineering",
    subtitle: "Murang’a University Of Technology",
    date: "2021 - 2025",
    description: "Pursuing a degree in Software Engineering with a focus on full-stack development.",
    type: "education",
    details: [],
  },
  {
    id: "2",
    title: "Intern and Software Developer",
    subtitle: "Harmosoft",
    date: "Apr 2024 - Jul 2024",
    organizationUrl: "https://harmosoft.co.ke",
    description: "Coordinated the development of the HBS (Book Store) Project.",
    type: "work",
    details: [
      "Led development lifecycle from planning to deployment.",
      "Collaborated with cross-functional teams to enhance performance.",
      "Integrated modern coding best practices.",
    ],
  },
  {
    id: "3",
    title: "Full-Stack Developer",
    subtitle: "Tovu Sacco Admin Dashboard & Mobile App",
    date: "Jan 2025",
    description:
      "Designed and developed a comprehensive admin dashboard and mobile app for financial operations management.",
    type: "work",
    details: [
      "Implemented secure authentication and real-time data visualization.",
      "Managed loans, investments, transactions, and user accounts.",
    ],
  },
  {
    id: "4",
    title: "Mobile App Developer",
    subtitle: "Community Guardian",
    date: "Jul 2024",
    description: "Designed an app focused on community engagement and crime reduction.",
    type: "work",
    details: [
      "Implemented anonymous reporting features.",
      "Integrated emergency alerts and real-time law enforcement updates.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://example.com",
  },
  {
    id: "5",
    title: "AI Developer",
    subtitle: "Immunity Shield (Intrusion Detection System)",
    date: "Aug 2024",
    description: "Developed a machine-learning-based intrusion detection system for cybersecurity.",
    type: "work",
    details: [
      "Enhanced anomaly detection techniques.",
      "Improved endpoint security with real-time threat detection.",
    ],
  },
  {
    id: "6",
    title: "Full-Stack Developer",
    subtitle: "Harmosoft Book Store",
    date: "Jun 2024 - Jul 2024",
    organizationUrl: "https://harmosoft.co.ke",
    description: "Developed an e-commerce platform for an online bookstore.",
    type: "work",
    details: [
      "Built features for browsing, purchasing, and reviewing books.",
      "Implemented secure payment integration and inventory management.",
    ],
  },
  {
    id: "7",
    title: "IoT Developer",
    subtitle: "CarIgnition (Prototype for Vehicle Security)",
    date: "Sep 2024",
    description: "Developed a prototype app for remotely starting and securing vehicles.",
    type: "work",
    details: ["Integrated IoT technology for vehicle automation.", "Implemented encrypted communication channels."],
  },
  {
    id: "8",
    title: "Mobile App Developer",
    subtitle: "Swift Traders",
    date: "Dec 2024 - Jan 2025",
    description: "Built an educational app for financial literacy and investment strategies.",
    type: "work",
    details: ["Developed interactive lessons and trading simulations.", "Enhanced user experience with real-time analytics."],
  },
]

export default function TimelinePage() {
  return (
    <main className="container py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Timeline</h1>
          <p className="text-lg text-muted-foreground">My professional journey and educational background</p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-border md:left-1/2" aria-hidden="true" />
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className={`relative grid gap-8 md:grid-cols-2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
    >
      <div
        className={`flex items-center ${
          index % 2 === 0 ? "justify-end md:col-start-1" : "justify-start md:col-start-2"
        }`}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <ul className="space-y-2 text-sm">
              {item.details.map((detail:string, i: number ) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
            {item.technologies && (
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech:string) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
            {item.link && (
              <Button variant="outline" size="sm" asChild>
                <Link href={item.link} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      <div
        className={`flex items-center ${
          index % 2 === 0 ? "justify-start md:col-start-2" : "justify-end md:col-start-1"
        }`}
      >
        <div className="text-lg font-semibold">{item.date}</div>
      </div>
      <div
        className="absolute left-8 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background md:left-1/2"
        aria-hidden="true"
      />
    </motion.div>
  )
}

