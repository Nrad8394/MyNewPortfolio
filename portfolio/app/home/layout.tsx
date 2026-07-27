import type React from "react"
import type { Metadata } from "next"

const title = "Home"
const description =
  "Karanja Benjamin builds fast, functional websites and mobile apps with modern technologies. Explore projects, skills and experience."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/home" },
  openGraph: { title, description, url: "/home" },
  twitter: { title, description },
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
