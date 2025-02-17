"use client"

import { useEffect, useState, useCallback } from "react"
import Home from "@/app/home/page"
import About from "@/app/about/page"
import Blog from "@/app/blog/page"
import Contact from "@/app/contact/page"
import Projects from "@/app/projects/page"
import Resume from "@/app/resume/page"
import Testimonials from "@/app/testimonials/page"
import Timeline from "@/app/timeline/page"
import Skills from "@/app/skills/page"
import { explorerSections, checkAchievements } from "@/lib/explorer"
import type { ExplorerProgress, ExplorerSection } from "@/types/explorer"

export default function HomePage() {
  const [progress, setProgress] = useState<ExplorerProgress>({
    visitedSections: [],
    achievements: [],
    lastVisited: undefined,
    totalTime: 0,
  })

  const [timelineTime, setTimelineTime] = useState(0)

  // Load progress from localStorage on mount
  useEffect(() => {
    const storedProgress = localStorage.getItem("portfolioProgress")
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress) as ExplorerProgress)
    }
  }, [])

  // Track total time spent on the page
  useEffect(() => {
    const startTime = Date.now()

    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsedTime = Date.now() - startTime

        const updatedProgress = {
          ...prev,
          totalTime: elapsedTime,
          achievements: checkAchievements({ ...prev, totalTime: elapsedTime }).map((a) => a.id),
        }

        return updatedProgress
      })
    }, 5000) // Updates every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle section visibility tracking
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    setProgress((prevProgress) => {
      let updatedProgress = { ...prevProgress }
      let isUpdated = false

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id

          if (!updatedProgress.visitedSections.includes(sectionId)) {
            updatedProgress.visitedSections = [...updatedProgress.visitedSections, sectionId]
            updatedProgress.lastVisited = new Date().toISOString()
            updatedProgress.achievements = checkAchievements(updatedProgress).map((a) => a.id)
            isUpdated = true
          }
        }
      })

      if (isUpdated) {
        localStorage.setItem("portfolioProgress", JSON.stringify(updatedProgress))
        return updatedProgress
      }

      return prevProgress
    })
  }, [])

  // Observe sections on mount
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.3 })

    setTimeout(() => {
      explorerSections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          observer.observe(element)
        } else {
          console.warn("Section not found:", section.id)
        }
      })
    }, 100)

    return () => observer.disconnect()
  }, [handleIntersection])

  // Handle Timeline time tracking separately and mark as read
  useEffect(() => {
    let timelineStartTime: number | undefined
  
    const handleTimelineIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target.id === "timeline" && entry.isIntersecting) {
          if (!timelineStartTime) {
            timelineStartTime = Date.now()
          }
  
          // Mark 'timeline' section as read when visible
          setProgress((prevProgress) => {
            // Ensure that we are creating a new copy of progress first
            const updatedProgress = { ...prevProgress }
  
            if (!updatedProgress.visitedSections.includes("timeline")) {
              updatedProgress.visitedSections = [...updatedProgress.visitedSections, "timeline"]
              updatedProgress.lastVisited = new Date().toISOString()
  
              // Call checkAchievements with updated progress
              updatedProgress.achievements = checkAchievements(updatedProgress).map((a) => a.id)
            }
  
            // Save the updated progress to localStorage
            localStorage.setItem("portfolioProgress", JSON.stringify(updatedProgress))
  
            return updatedProgress
          })
        } else if (entry.target.id === "timeline" && !entry.isIntersecting && timelineStartTime) {
          const timeSpent = Date.now() - timelineStartTime
          setTimelineTime(timeSpent)
          timelineStartTime = undefined // Reset time
        }
      })
    }
  
    const timelineObserver = new IntersectionObserver(handleTimelineIntersection, { threshold: 0.1 })
    const timelineElement = document.getElementById("timeline")
    if (timelineElement) {
      timelineObserver.observe(timelineElement)
    }
  
    return () => timelineObserver.disconnect()
  }, [])
  

  // Debugging log for progress updates
  useEffect(() => {

  }, [progress, timelineTime])

  return (
    <main className="container mx-auto py-12">
      {explorerSections.map(({ id }) => {
        // Dynamically mapping section IDs to their components
        const SectionComponent = {
          home: Home,
          about: About,
          skills: Skills,
          projects: Projects,
          // blog: Blog,
          resume: Resume,
          // testimonials: Testimonials,
          timeline: Timeline,
          contact: Contact,
        }[id]

        return SectionComponent ? (
          <section key={id} id={id} className="mb-12">
            <SectionComponent />
          </section>
        ) : null
      })}
    </main>
  )
}
