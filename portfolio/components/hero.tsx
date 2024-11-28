import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Header Content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white animate-fade-in">
              Benjamin Karanja
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl animate-fade-in delay-150">
              Full Stack Software Developer | AI Enthusiast | Problem Solver
            </p>
          </div>

          {/* Call to Actions */}
          <div className="space-x-4 animate-fade-in delay-300">
            <Button asChild variant="secondary" className="hover:scale-105 transition-transform duration-300">
              <a href="#contact" className="flex items-center space-x-2">
                <span>Contact Me</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild className="hover:scale-105 transition-transform duration-300">
              <a href="#projects" className=" ">
                View Projects
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 mt-6 animate-fade-in delay-450">
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 text-white hover:text-gray-300" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 text-white hover:text-gray-300" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
