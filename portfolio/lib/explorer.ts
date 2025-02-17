import type { ExplorerSection, Achievement } from "@/types/explorer"
import type { ExplorerProgress } from "@/types/explorer"

export const explorerSections: ExplorerSection[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    description: "Welcome to my portfolio",
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    description: "Learn more about me",
  },
  {
    id: "skills",
    label: "Skills",
    path: "/skills",
    description: "Explore my technical skills",
  },
  {
    id: "projects",
    label: "Projects",
    path: "/projects",
    description: "View my work",
  },
  // {
  //   id: "blog",
  //   label: "Blog",
  //   path: "/blog",
  //   description: "Read my articles",
  // },
  {
    id: "timeline",
    label: "Timeline",
    path: "/timeline",
    description: "My professional journey",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    path: "/testimonials",
    description: "What others say",
  },
  {
    id: "resume",
    label: "Resume",
    path: "/resume",
    description: "Download my CV",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    description: "Get in touch",
  },
]

export const achievements: Achievement[] = [
  {
    id: "explorer",
    title: "Explorer",
    description: "Visit all sections of the portfolio",
    icon: "🌟",
  },
  {
    id: "quick_tour",
    title: "Quick Tour",
    description: "Visit 3 sections in under 5 minutes",
    icon: "⚡",
  },
  {
    id: "engaged",
    title: "Engaged Visitor",
    description: "Spend more than 5 minutes exploring",
    icon: "👀",
  },
  {
    id: "tech_enthusiast",
    title: "Tech Enthusiast",
    description: "View all technical skills",
    icon: "💻",
  },
  {
    id: "project_explorer",
    title: "Project Explorer",
    description: "View details of 3 different projects",
    icon: "🚀",
  },
]

export function calculateProgress(visitedSections: string[]): number {
  return Math.round((visitedSections.length / explorerSections.length) * 100)
}

export function checkAchievements(progress: ExplorerProgress): Achievement[] {
  const unlockedAchievements: Achievement[] = []

  // Explorer Achievement
  if (progress.visitedSections.length === explorerSections.length) {
    unlockedAchievements.push(achievements.find((a) => a.id === "explorer")!)
  }

  // Quick Tour Achievement
  if (
    progress.visitedSections.length >= 3 &&
    progress.totalTime &&
    progress.totalTime <= 300000 // 5 minutes in milliseconds
  ) {
    unlockedAchievements.push(achievements.find((a) => a.id === "quick_tour")!)
  }

  // Engaged Visitor Achievement
  if (progress.totalTime && progress.totalTime >= 300000) {
    unlockedAchievements.push(achievements.find((a) => a.id === "engaged")!)
  }

  return unlockedAchievements
}

