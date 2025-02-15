export interface TimelineItem {
  id: string
  title: string
  subtitle: string
  date: string
  description: string
  type: "work" | "education"
  details: string[]
  technologies?: string[]
  link?: string
}

