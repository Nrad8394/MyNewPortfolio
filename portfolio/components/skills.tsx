import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud, Network, Figma, GitBranch, Brain } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    { name: "Programming", icon: Code, skills: ["C++", "Python", "JavaScript", "Java", "Bash Scripting"] },
    { name: "Web Development", icon: Cloud, skills: ["React", "Next.js", "Django", "Express", "Node.js"] },
    { name: "Databases", icon: Database, skills: ["SQL", "MongoDB", "PostgreSQL"] },
    { name: "DevOps", icon: Cloud, skills: ["Docker", "Digital Ocean", "CI/CD", "Linux", "Bash Scripting"] },
    { name: "Networking", icon: Network, skills: ["Cisco", "Network Protocols"] },
    { name: "Data & AI", icon: Brain, skills: ["Data Analysis", "PyTorch", "TensorFlow"] },
    { name: "Design", icon: Figma, skills: ["UI/UX Design", "Figma"] },
    { name: "Project Management", icon: GitBranch, skills: ["Jira", "Agile Methodologies"] }
  ]

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary mb-8">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xl font-semibold flex items-center space-x-2">
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

