import type React from "react"
import type { Metadata } from "next"

const title = "Projects"
const description =
  "A showcase of recent work by Karanja Benjamin, including the Harmosoft Book Store, Tovu Sacco admin dashboard, Community Guardian app, CarIgnition IoT security and Swift Traders."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title, description, url: "/projects" },
  twitter: { title, description },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
