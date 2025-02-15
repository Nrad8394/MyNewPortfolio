"use client"

import { useEffect, useState } from "react"

export function SkipLink() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-50 -translate-y-16 rounded-md bg-background px-4 py-2 text-sm font-medium opacity-0 shadow-sm transition-all focus:translate-y-0 focus:opacity-100"
    >
      Skip to main content
    </a>
  )
}

