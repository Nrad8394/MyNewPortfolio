import type React from "react"
import type { Metadata } from "next"

const title = "Contact"
const description =
  "Get in touch with Karanja Benjamin about web, mobile or full-stack development work. Send a message or connect on GitHub and LinkedIn."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
  twitter: { title, description },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
