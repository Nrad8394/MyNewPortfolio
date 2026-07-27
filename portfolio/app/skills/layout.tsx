import type React from "react"
import type { Metadata } from "next"

const title = "Skills & Technologies"
const description =
  "A comprehensive overview of Karanja Benjamin's technical skills: Next.js, React, TypeScript, Django REST Framework, React Native, PostgreSQL, Docker and cybersecurity."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/skills" },
  openGraph: { title, description, url: "/skills" },
  twitter: { title, description },
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
