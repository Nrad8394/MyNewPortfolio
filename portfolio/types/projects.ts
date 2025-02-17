export interface Project {
  title: string
  description: string
  category: "Web Apps" | "Mobile" | "Open Source" | "AI" | "IoT"
  image: string
  tech: string[]
  github: string
  demo: string | null
  details: string
}

