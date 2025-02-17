"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, RefreshCw } from "lucide-react"
import Editor from "@monaco-editor/react"
import type { CodeExample } from "@/types/playground"

interface CodePlaygroundProps {
  examples: CodeExample[]
}

export function CodePlayground({ examples }: CodePlaygroundProps) {
  const [selectedExample, setSelectedExample] = useState(examples[0])
  const [code, setCode] = useState(selectedExample.code)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    try {
      // This is a simplified example. In a real app, you'd want to:
      // 1. Send the code to a secure backend
      // 2. Execute it in a sandboxed environment
      // 3. Return the results
      const result = await new Function(code)()
      setOutput(String(result))
    } catch (error) {
      setOutput(String(error))
    }
    setIsRunning(false)
  }

  const handleReset = () => {
    setCode(selectedExample.code)
    setOutput("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Code Playground</CardTitle>
        <CardDescription>Try out some code examples</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {examples.map((example) => (
            <Button
              key={example.id}
              variant={selectedExample.id === example.id ? "default" : "outline"}
              onClick={() => {
                setSelectedExample(example)
                setCode(example.code)
                setOutput("")
              }}
            >
              {example.title}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="rounded-lg border">
              <Editor
                height="300px"
                language={selectedExample.language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  readOnly: isRunning,
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRun} disabled={isRunning} className="flex-1">
                {isRunning ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                Run Code
              </Button>
              <Button variant="outline" onClick={handleReset} disabled={isRunning}>
                Reset
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Output</h3>
            <div className="h-[300px] rounded-lg border bg-muted p-4">
              <pre className="h-full overflow-auto">
                <code>{output || "// Output will appear here"}</code>
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

