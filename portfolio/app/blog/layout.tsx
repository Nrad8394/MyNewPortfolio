import type React from "react"
import type { Metadata } from "next"

const title = "Blog"
const description =
  "Thoughts, tutorials and insights on web development, mobile development and software engineering by Karanja Benjamin."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog", type: "website" },
  twitter: { title, description },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
