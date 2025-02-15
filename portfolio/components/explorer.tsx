"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Trophy, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { explorerSections, achievements, calculateProgress, checkAchievements } from "@/lib/explorer"
import type { ExplorerProgress } from "@/types"

export function Explorer() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [progress, setProgress] = useState<ExplorerProgress>({
    visitedSections: [],
    achievements: [],
    lastVisited: undefined,
    totalTime: 0,
  })

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem("portfolioProgress")
    if (stored) {
      setProgress(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const currentSection = explorerSections.find((section) => section.path === pathname)

    if (currentSection && !progress.visitedSections.includes(currentSection.id)) {
      const updatedProgress: ExplorerProgress = {
        ...progress,
        visitedSections: [...progress.visitedSections, currentSection.id],
        lastVisited: new Date().toISOString(),
      }

      // Check for new achievements
      const newAchievements = checkAchievements(updatedProgress)
      if (newAchievements.length > 0) {
        updatedProgress.achievements = [...progress.achievements, ...newAchievements.map((a) => a.id)]
      }

      setProgress(updatedProgress)
      localStorage.setItem("portfolioProgress", JSON.stringify(updatedProgress))
    }
  }, [pathname, progress])

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 left-4 z-50"
        size="icon"
        variant="outline"
        onClick={() => setIsOpen(true)}
        aria-label="Show portfolio explorer"
      >
        <Trophy className="h-4 w-4" />
      </Button>
    )
  }

  const progressPercentage = calculateProgress(progress.visitedSections)

  return (
    <Card className="fixed bottom-4 left-4 z-50 w-80 shadow-lg">
      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Portfolio Explorer</CardTitle>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Show less" : "Show more"}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
              aria-label="Close explorer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>You&apos;ve explored {progressPercentage}% of my portfolio!</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <Progress value={progressPercentage} className="h-2" />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 space-y-4"
            >
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sections Visited</h4>
                <div className="flex flex-wrap gap-1">
                  {explorerSections.map((section) => (
                    <TooltipProvider key={section.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant={progress.visitedSections.includes(section.id) ? "default" : "outline"}>
                            {section.label}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{section.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Achievements</h4>
                <div className="flex flex-wrap gap-1">
                  {achievements.map((achievement) => (
                    <TooltipProvider key={achievement.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant={progress.achievements.includes(achievement.id) ? "default" : "outline"}>
                            {achievement.icon} {achievement.title}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{achievement.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

