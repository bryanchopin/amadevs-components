"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Send } from "lucide-react"
import ChatMessage from "./chat-message"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt2")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Use our API route
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: selectedModel, inputs: input }),
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData.error || `API error: ${result.status} ${result.statusText}`)
      }

      const data = await result.json()
      let response: string
      if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
        response = data[0].generated_text
      } else if (typeof data === "object" && data.generated_text) {
        response = data.generated_text
      } else {
        console.error("Unexpected API response format:", data)
        throw new Error("Unexpected response format from API")
      }

      const assistantMessage: Message = { role: "assistant", content: response }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      let errorMessage = "Failed to generate response. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
        if (errorMessage.includes("Invalid credentials")) {
          errorMessage = "Authentication error. Please check the API token configuration."
        }
      }
      const errorResponseMessage: Message = {
        role: "assistant",
        content: `Error: ${errorMessage}`,
      }
      setMessages((prev) => [...prev, errorResponseMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="flex flex-col h-full w-full border rounded-lg overflow-hidden">
      <div className="p-4 border-b flex justify-end items-center">
        <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isLoading}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt2">GPT-2</SelectItem>
            <SelectItem value="distilgpt2">DistilGPT-2</SelectItem>
            <SelectItem value="dccuchile/bert-base-spanish-wwm-cased">dccuchile/bert-base-spanish-wwm-cased</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Send a message to start the conversation</p>
          </div>
        ) : (
          messages.map((message, index) => <ChatMessage key={index} message={message} />)
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] max-h-[120px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="h-[60px] w-[60px]" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </form>
    </Card>
  )
}

