import type React from "react"
import type { Metadata } from "next"

// page.tsx is a client component and cannot export metadata, so it lives here.
const title = "About"
const description =
  "Get to know Karanja Benjamin: a full-stack software engineer from Nairobi, Kenya, with a BSc in Software Engineering and experience across web, mobile, AI and cybersecurity."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
  twitter: { title, description },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
