import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { SkipLink } from "@/components/skip-link"
import { Chatbot } from "@/components/chat-bot"
import { Explorer } from "@/components/explorer"
import { AnimatedBackground } from "@/components/animated-background"
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karanja Benjamin | Software Engineer & Tech Enthusiast",
  description: "Showcasing my expertise in web and mobile development, featuring projects, experience, and technical skills.",
  icons: "/assets/favicon.ico",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#1a202c",
  other: {
    "theme-color": "#1a202c",
    author: "Karanja Benjamin",
    keywords: "web development, mobile development, software engineering, tech enthusiast",
    linkedin: "https://www.linkedin.com/in/karanja-benjamin",
  },
  openGraph: {
    title: "Karanja Benjamin | Software Engineer",
    description: "Building modern and scalable web applications.",
    url: "https://karanjasoftwareengineer.great-site.net/",
    siteName: "Karanja Benjamin",
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
    description: "Building modern and scalable web applications.",
    images: ["/assets/portfolio.png"],
  },
  alternates: {
    canonical: "https://karanjasoftwareengineer.great-site.net/",
  },
  verification: {
    other: {
      linkedin: "https://www.linkedin.com/in/benjamin-karanja-93852523b",
    },
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <body className={inter.className}>
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



import './globals.css'