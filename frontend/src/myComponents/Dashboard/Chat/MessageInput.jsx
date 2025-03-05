
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Smile, Paperclip, Mic } from "lucide-react"

export default function MessageInput() {
  const [isRecording, setIsRecording] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    }
  }

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-all duration-300 ease-in-out">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-transform hover:scale-110"
        >
          <Paperclip className="size-5" />
        </Button>
        <div className={`relative flex-1 transition-all duration-300 ${isFocused ? "scale-[1.01]" : ""}`}>
          <Input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:ring-gray-500 transition-all pr-10 rounded-full"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-black dark:text-white hover:bg-transparent"
          >
            <Smile className="size-5" />
          </Button>
        </div>
        {/* {input.trim() ? (
          <Button
            type="submit"
            size="icon"
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-110 animate-subtle-shine rounded-full"
          >
            <Send className="size-5" />
          </Button>
        ) : (
          <Button
            type="button"
            size="icon"
            className={`${isRecording ? "bg-red-500" : "bg-black dark:bg-white"} text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-110 ${isRecording ? "animate-pulse" : ""} rounded-full`}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic className="size-5" />
          </Button>
        )} */}
      </form>
    </div>
  )
}

