import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#",
      github: "#"
    },
    {
      title: "AI-powered Chatbot",
      description: "An intelligent chatbot using natural language processing",
      tags: ["Python", "TensorFlow", "NLP", "Flask"],
      link: "#",
      github: "#"
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills",
      tags: ["Next.js", "Tailwind CSS", "Vercel"],
      link: "#",
      github: "#"
    }
  ]

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary mb-8">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="bg-muted">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="ghost">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Project</span>
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <Github className="h-4 w-4" />
                    <span>Source Code</span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

