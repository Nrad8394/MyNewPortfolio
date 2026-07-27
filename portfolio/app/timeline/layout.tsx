import type React from "react"
import type { Metadata } from "next"

const title = "Timeline"
const description =
  "The professional journey and educational background of Karanja Benjamin, from a BSc in Software Engineering to full-stack and mobile development work."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/timeline" },
  openGraph: { title, description, url: "/timeline" },
  twitter: { title, description },
}

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
