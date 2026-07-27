import type React from "react"
import type { Metadata } from "next"

const title = "Client Testimonials"
const description =
  "What clients and collaborators say about working with Karanja Benjamin on web, mobile and full-stack engineering projects."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/testimonials" },
  openGraph: { title, description, url: "/testimonials" },
  twitter: { title, description },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
