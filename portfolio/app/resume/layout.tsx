import type React from "react"
import type { Metadata } from "next"

const title = "Resume"
const description =
  "Resume of Karanja Benjamin, software engineer in Nairobi, Kenya: education, professional experience, technical skills and certifications."

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
