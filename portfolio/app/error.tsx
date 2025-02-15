"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-24 w-24 text-destructive" />
        <h1 className="text-4xl font-bold">Something went wrong!</h1>
        <p className="text-xl text-muted-foreground">An error occurred while loading this page.</p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </main>
  )
}

