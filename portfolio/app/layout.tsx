import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { SkipLink } from "@/components/skip-link"
import { Chatbot } from "@/components/chat-bot"
import { Explorer } from "@/components/explorer"
import { AnimatedBackground } from "@/components/animated-background"
import { Inter } from "next/font/google";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
const inter = Inter({ subsets: ["latin"] });

const DESCRIPTION =
  "Portfolio of Karanja Benjamin, a full-stack software engineer in Nairobi, Kenya building web and mobile applications with Next.js, React Native, Django and TypeScript.";

// themeColor and viewport are their own export in the App Router -- they are
// ignored if left inside `metadata`.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a202c",
};

export const metadata: Metadata = {
  // Relative URLs below resolve against this. Without it Next falls back to
  // http://localhost:3000, which silently breaks every link preview.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Karanja Benjamin | Software Engineer & Tech Enthusiast",
    // Per-page titles fill in %s -- see each route's layout.tsx.
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  icons: "/assets/favicon.ico",
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  keywords: [
    "Karanja Benjamin",
    "Benjamin Karanja Njoroge",
    "software engineer Nairobi",
    "full-stack developer Kenya",
    "Next.js developer",
    "React Native developer",
    "Django developer",
    "web development",
    "mobile development",
  ],
  openGraph: {
    title: "Karanja Benjamin | Software Engineer",
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Karanja Benjamin Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karanja Benjamin | Software Engineer",
    description: DESCRIPTION,
    images: ["/assets/portfolio.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Structured data. Gives Google an explicit Person entity instead of making it
// infer one from prose -- this is what powers knowledge-panel style results.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  alternateName: AUTHOR.alternateName,
  url: SITE_URL,
  image: `${SITE_URL}/assets/picture.jpg`,
  jobTitle: AUTHOR.jobTitle,
  email: `mailto:${AUTHOR.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  sameAs: [AUTHOR.github, AUTHOR.linkedin],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Django REST Framework",
    "React Native",
    "PostgreSQL",
    "Docker",
    "Cybersecurity",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Murang'a University of Technology",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: { "@type": "Person", name: AUTHOR.name },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* No <Head> here: next/head is a no-op in the App Router (it never rendered).
          next/font self-hosts Inter at build time, so there is nothing to preconnect to. */}
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SkipLink />
          <AnimatedBackground />
          <div className="min-h-screen bg-gradient-to-b from-background/50 to-muted/50">
            <Navigation />
            <div id="main-content" tabIndex={-1}>
              {children}
            </div>
          </div>
          <Chatbot />
          <Explorer />
        </ThemeProvider>
      </body>
    </html>
  )
}