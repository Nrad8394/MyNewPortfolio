"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Image from "next/image"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useRef } from "react"
import { link } from "fs"

const experiences = [
  {
    company: "Harmosoft",
    role: "Intern and Software Developer",
    duration: "2024.04 - 2024.07",
    description:
      "Coordinated the development of the HBS (Book Store) Project. Spearheaded the development lifecycle from planning to development, ensuring timely delivery. Collaborated with cross-functional teams to enhance system performance and integrated modern coding best practices.",
    achievements: [
      "Led project development from initiation to delivery",
      "Optimized system functionality using modern coding practices",
      "Collaborated across teams to enhance performance",
    ],
  },
  {
    company: "Tovu Sacco",
    role: "Full-Stack Developer",
    duration: "2025.01 - 2025.01",
    description:
      "Designed and developed a comprehensive admin dashboard and mobile application for Tovu Sacco. The platform enables seamless management of users, loans, investments, transactions, and financial operations. Implemented secure authentication and data visualization for real-time insights.",
    achievements: [
      "Developed an admin dashboard and mobile app for financial management",
      "Implemented secure authentication for user safety",
      "Provided real-time data visualization for enhanced insights",
    ],
  },
  {
    company: "Community Guardian",
    role: "Mobile App Developer",
    duration: "2024.07 - 2024.07",
    description:
      "Designed a mobile app focused on community engagement to reduce crime. Features include anonymous reporting, emergency alerts, and real-time updates from local law enforcement.",
    achievements: [
      "Developed an app to engage communities in crime reduction",
      "Integrated emergency alerts and anonymous reporting features",
      "Enabled real-time updates from law enforcement for safety",
    ],
  },
  {
    company: "Immunity Shield",
    role: "AI Developer",
    duration: "2024.08 - 2024.08",
    description:
      "Built an Intrusion Detection System (IDS) for endpoint security, leveraging machine learning algorithms to detect and isolate potential threats. Enhanced cybersecurity measures through anomaly detection techniques.",
    achievements: [
      "Developed an IDS using machine learning for threat detection",
      "Implemented anomaly detection for enhanced cybersecurity",
      "Optimized endpoint security with AI-driven insights",
    ],
  },
  {
    company: "Harmosoft",
    role: "Full-Stack Developer",
    duration: "2024.06 - 2024.07",
    description:
      "Developed an e-commerce platform for an online bookstore. The system allows users to browse, purchase, and review books, with features for inventory management and secure payment integration.",
    achievements: [
      "Developed an e-commerce platform for online book sales",
      "Integrated secure payment solutions and inventory management",
      "Implemented user-friendly book browsing and purchasing features",
    ],
  },
  {
    company: "CarIgnition",
    role: "IoT Developer",
    duration: "2024.09 - 2024.09",
    description:
      "Created a prototype app for remotely starting and securing vehicles. Focused on IoT integrations for vehicle automation, enhancing security with encrypted communication channels.",
    achievements: [
      "Developed a prototype for remotely securing vehicles",
      "Integrated IoT solutions for vehicle automation",
      "Enhanced vehicle security with encrypted communication",
    ],
  },
  {
    company: "Swift Traders",
    role: "Mobile App Developer",
    duration: "2024.12 - 2025.01",
    description:
      "Developed an educational mobile app aimed at enhancing financial literacy and trading skills, helping users understand investment strategies.",
    achievements: [
      "Built an app to improve financial literacy and trading skills",
      "Created educational tools for understanding investment strategies",
    ],
  },
];

const education = [
  {
    institution: "Murang’a University Of Technology",
    degree: "Bachelor of Science in Software Engineering",
    duration: "2021.08 - 2025.04",
    achievements: [
      "Pursuing Bachelor's in Software Engineering",
      "Ongoing development of practical skills in full-stack and mobile app development",
    ],
    link: "https://mut.ac.ke",
  },
  {
    institution: "Cisco Academy",
    degree: "Introduction to Data Analysis",
    duration: "2023.05 - 2023.06",
    achievements: ["Learned foundational data analysis techniques"],
    link: "https://www.credly.com/badges/9ac4a9cf-57a6-4468-93f8-d00a132e5c58",
  },
  {
    institution: "Cisco Academy",
    degree: "Introduction to IoT",
    duration: "2023.07 - 2023.08",
    achievements: ["Explored Internet of Things (IoT) technologies"],
    link: "https://www.credly.com/badges/231057f2-8c67-4211-a725-2bf6ac766fff",
  },
  {
    institution: "Cisco Academy",
    degree: "Networking Essentials",
    duration: "2023.08 - 2023.09",
    achievements: ["Gained knowledge in networking fundamentals"],
    link: "https://www.credly.com/badges/99bc5645-a771-4d90-9058-2ccd6325bed9",
  },
];

const skills = [
  "Python",
  "JavaScript",
  "TypeScript",
  "SQL",
  "C++",
  "Django (REST Framework)",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "Express.js",
  "React Native",
  "Expo Router",
  "MySQL Workbench",
  "PostgreSQL (PgAdmin)",
  "SQLite",
  "RESTful APIs",
  "JSON",
  "Visual Studio Code",
  "Apache",
  "Nginx",
  "Docker",
  "Git & GitHub",
  "Postman",
  "Node.js",
  "Netlify",
  "Vercel",
  "Heroku",
  "Digital Ocean",
  "Python Anywhere",
  "Infinity Free",
  "Windows",
  "Ubuntu (Linux)",
  "WSL",
  "GitLab",
  "Docker Compose",
  "GitHub Actions",
  "Figma",
  "Canva",
  "CorelDRAW",
  "Scikit-learn",
  "Data Analysis",
  "Introduction to AI",
  "Basic Cybersecurity Concepts",
  "Intrusion Detection Systems",
  "Isolation Forest Algorithm",
  "Networking Essentials",
];
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
    pdf.save("cv.pdf")
  }

  return (
    <main className="container py-8 px-4 md:px-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Resume</h1>
        <div className="flex flex-wrap gap-2">
          {/* <Button onClick={generatePDF} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Portfolio
          </Button> */}
          <a href="/assets/Benjamins Cv.pdf" download="Benjamin_Karanja_Resume.pdf">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </a>
        </div>
      </div>

      <div ref={resumeRef} className="space-y-8 bg-background p-6 md:p-8 rounded-lg">
        {/* Profile Section */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
          <div className="relative aspect-square h-40 w-40 md:h-48 md:w-48 mx-auto md:mx-0 overflow-hidden rounded-xl">
            <Image src="/assets/picture.jpg" alt="Profile" fill className="object-cover" />
          </div>
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Benjamin Karanja Njoroge</h2>
            <p className="text-lg text-muted-foreground">Full Stack Developer</p>
            <p className="text-sm md:text-base text-muted-foreground">
              Passionate full-stack developer with 5+ years of experience in building modern web applications.
              Specialized in React, Node.js, and cloud technologies.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Experience</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experiences.map((exp) => (
              <Card key={exp.company} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="break-words">
                      <CardTitle>{exp.role}</CardTitle>
                      <CardDescription>{exp.company}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.duration}</span>
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

        {/* Education Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Education</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.map((edu) => (
              <Card key={edu.institution} className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="break-words">
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription>{edu.institution}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{edu.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                 {edu.link && <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View Certificate
                  </a>}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm px-2 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}