"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Image from "next/image"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useRef } from "react"

const experiences = [
  {
    company: "Tech Solutions Inc.",
    role: "Senior Full Stack Developer",
    duration: "2021 - Present",
    description:
      "Led development of enterprise web applications using Next.js and Node.js. Managed team of 5 developers.",
    achievements: [
      "Improved application performance by 40%",
      "Implemented CI/CD pipeline",
      "Reduced deployment time by 60%",
    ],
  },
  {
    company: "Digital Innovations Ltd",
    role: "Frontend Developer",
    duration: "2019 - 2021",
    description: "Developed responsive web applications using React and TypeScript.",
    achievements: ["Built 10+ client projects", "Mentored junior developers", "Introduced TypeScript to the team"],
  },
]

const education = [
  {
    institution: "University of Technology",
    degree: "BSc in Computer Science",
    duration: "2015 - 2019",
    achievements: ["First Class Honours", "President of Computing Society", "Best Final Year Project Award"],
  },
]

const skills = ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker"]

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    if (!resumeRef.current) return

    const canvas = await html2canvas(resumeRef.current)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    })

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
    pdf.save("resume.pdf")
  }

  return (
    <main className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Resume</h1>
        <Button onClick={generatePDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div ref={resumeRef} className="space-y-8 bg-background p-8">
        <section className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="relative aspect-square h-48 overflow-hidden rounded-xl">
            <Image src="/placeholder.svg" alt="Profile" fill className="object-cover" />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold">John Doe</h2>
              <p className="text-xl text-muted-foreground">Full Stack Developer</p>
            </div>
            <p className="text-muted-foreground">
              Passionate full-stack developer with 5+ years of experience in building modern web applications.
              Specialized in React, Node.js, and cloud technologies.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Experience</h3>
          <div className="grid gap-4">
            {experiences.map((exp) => (
              <Card key={exp.company}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{exp.role}</CardTitle>
                      <CardDescription>{exp.company}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">{exp.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Education</h3>
          <div className="grid gap-4">
            {education.map((edu) => (
              <Card key={edu.institution}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription>{edu.institution}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">{edu.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

