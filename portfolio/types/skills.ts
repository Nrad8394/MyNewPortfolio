import type React from "react"
export interface Skill {
  name: string
  icon: React.ReactNode
  proficiency: number
  experience: string
  projects: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

