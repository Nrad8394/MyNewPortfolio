"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

 
export default function Home() {
  const [text] = useTypewriter({
    words: ["Hi, I'm Karanja Benjamin", "Full-Stack Developer", "React & Django Enthusiast", "Building Scalable Solutions"],
    loop: true,
    delaySpeed: 2000,
  });
  

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center p-4" id="main-content">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-primary"
        >
          <Image src="/assets/picture.jpg" alt="John Doe's profile picture" className="object-cover" fill priority />
        </motion.div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span>{text}</span>
            <Cursor cursorColor="currentColor" />
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            I create beautiful and functional websites and Mobile applications with modern technologies. Passionate about clean code and user
            experience.Most importantly I am a team player and a problem solver.
          </p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4 min-[400px]:flex-row"
        >
          <Button asChild size="lg">
            <Link href="/projects" className="inline-flex items-center">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Me</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://github.com/Nrad8394"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://www.linkedin.com/in/benjamin-karanja-93852523b"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:benjaminkaranja8393official@gmail.com" aria-label="Send me an email">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 opacity-50 dark:from-primary/10 dark:via-accent/20 dark:to-secondary/10"
        aria-hidden="true"
      >
        <div className="absolute inset-auto right-1/2 h-56 w-[30rem] bg-gradient-to-tr from-primary to-accent blur-3xl" />
        <div className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-to-tr from-accent to-secondary blur-3xl" />
      </div>
    </main>

  )
}

