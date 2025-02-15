export interface CodeExample {
  id: string
  title: string
  description: string
  code: string
  language: "javascript" | "typescript" | "python"
  defaultValues?: Record<string, any>
}

