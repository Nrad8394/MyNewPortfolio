"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO at TechStart",
    quote:
      "John's expertise in full-stack development helped us launch our product ahead of schedule. His attention to detail and problem-solving skills are exceptional.",
    image: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    position: "CTO at InnovateCo",
    quote:
      "Working with John was a game-changer for our team. His technical knowledge and ability to mentor others significantly improved our development process.",
    image: "/placeholder.svg",
  },
  {
    name: "Emily Brown",
    position: "Product Manager at DesignHub",
    quote:
      "John's ability to translate complex requirements into elegant solutions is remarkable. He's a valuable asset to any development team.",
    image: "/placeholder.svg",
  },
]

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <main className="container flex min-h-[calc(100vh-3.5rem)] items-center py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Client Testimonials</h1>
          <p className="mt-2 text-lg text-muted-foreground">What others say about working with me</p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" onClick={previous}>
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full" onClick={next}>
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          <div className="overflow-hidden px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle>{testimonials[currentIndex].name}</CardTitle>
                      <CardDescription>{testimonials[currentIndex].position}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="relative">
                      <Quote className="absolute -left-2 -top-2 h-8 w-8 text-muted-foreground/20" />
                      <p className="pl-6 text-lg italic text-muted-foreground">{testimonials[currentIndex].quote}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`h-2 w-2 rounded-full p-0 ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

