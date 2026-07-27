import type React from "react"
import type { Metadata } from "next"

const title = "Resume"
const description =
  "Resume of Karanja Benjamin, software engineer in Nairobi, Kenya. Currently an ICT intern with ICTA's Presidential Digital Talent Programme (PDTP) Cohort X, deployed to the Kenya Revenue Authority. Education, experience, skills and certifications."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resume" },
  openGraph: { title, description, url: "/resume" },
  twitter: { title, description },
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
