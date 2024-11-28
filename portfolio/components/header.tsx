import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Code, User, Briefcase, Mail } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Benjamin Karanja
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link href="#skills" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>Skills</span>
            </Link>
            <Link href="#projects" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link href="#contact" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

