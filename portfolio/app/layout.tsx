import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { SkipLink } from "@/components/skip-link"
import { Chatbot } from "@/components/chat-bot"
import { Explorer } from "@/components/explorer"
import { AnimatedBackground } from "@/components/animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description: "A modern and interactive portfolio website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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