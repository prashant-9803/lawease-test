"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, CheckCheck } from "lucide-react"

export default function ChatContainer() {
  const messagesEndRef = useRef(null)

  const messages = [
    { id: 1, text: "Hello", status: "sent" },
    { id: 2, text: "Hi there", status: "delivered" },
    { id: 3, text: "How are you?", status: "read" },
    { id: 4, text: "I'm good, thanks!", status: "sent" },
    { id: 5, text: "That's great!", status: "delivered" },]

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to render message status icon
  const renderMessageStatus = (status = "sent") => {
    switch (status) {
      case "sent":
        return <Check className="size-4 text-gray-500" />
      case "delivered":
        return <CheckCheck className="size-4 text-gray-500" />
      case "read":
        return <CheckCheck className="size-4 text-blue-500" />
      default:
        return <Check className="size-4 text-gray-500" />
    }
  }

  return (
    <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-950">
      <div className="space-y-4">
        {messages && (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              style={{
                animation: `${message.role === "user" ? "slideInRight" : "slideInLeft"} 0.4s ease-out forwards`,
                opacity: 0,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] shadow-sm ${
                  message.role === "user"
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800"
                }`}
              >
                <p>messageContent</p>
                <div className="flex items-center justify-end mt-1 gap-1">
                  <span
                    className={`text-xs ${
                      message.role === "user" ? "text-gray-300 dark:text-gray-700" : "text-gray-500"
                    }`}
                  >
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {message.role === "user" && renderMessageStatus(index === messages.length - 1 ? "sent" : "read")}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
}

