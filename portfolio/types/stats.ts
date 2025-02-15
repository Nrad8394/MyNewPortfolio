export interface GithubStats {
  totalContributions: number
  repositories: number
  followers: number
  stars: number
}

export interface ProjectStats {
  total: number
  completed: number
  inProgress: number
  technologies: {
    name: string
    count: number
  }[]
}

export interface CodingStats {
  totalHours: number
  languages: {
    name: string
    hours: number
  }[]
  weeklyCoding: {
    week: string
    hours: number
  }[]
}

