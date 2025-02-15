export interface ExplorerSection {
  id: string
  label: string
  path: string
  description: string
  requiredSections?: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
}

export interface ExplorerProgress {
  visitedSections: string[]
  achievements: string[]
  lastVisited?: string
  totalTime?: number
}

