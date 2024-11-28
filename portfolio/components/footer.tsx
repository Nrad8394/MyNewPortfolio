import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2023 Benjamin Karanja. All rights reserved.
          </p>
          <p className="text-center text-sm leading-loose text-muted-foreground flex items-center">
            Built with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

