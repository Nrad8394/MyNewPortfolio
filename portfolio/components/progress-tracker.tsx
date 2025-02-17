"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const sections = ["home", "about", "skills", "projects",  "timeline",  "contact", "resume"]

export function ProgressTracker() {
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set())
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Load visited sections from localStorage
    const stored = localStorage.getItem("visitedSections")
    if (stored) {
      setVisitedSections(new Set(JSON.parse(stored)))
    }

    // Track current section
    const trackSection = () => {
      const path = window.location.pathname.slice(1) || "home"
      setVisitedSections((prev) => {
        const next = new Set(prev).add(path)
        localStorage.setItem("visitedSections", JSON.stringify([...next]))
        return next
      })
    }

    trackSection()
    window.addEventListener("popstate", trackSection)
    return () => window.removeEventListener("popstate", trackSection)
  }, [])

  const progress = Math.round((visitedSections.size / sections.length) * 100)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 z-50 w-64 rounded-lg border bg-background p-4 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Portfolio Explorer</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsVisible(false)}
            aria-label="Close progress tracker"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">You&apos;ve explored {progress}% of my portfolio!</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

