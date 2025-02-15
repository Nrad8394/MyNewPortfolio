"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Globe } from "lucide-react"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (project: Project) => void
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="group relative h-full overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="border-b p-0">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
              loading={index <= 2 ? "eager" : "lazy"}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex w-full gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onSelect(project)}>
              Learn More
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} demo`}
              >
                <Globe className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
      </Card>
    </motion.div>
  )
}

