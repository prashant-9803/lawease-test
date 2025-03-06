import React from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

const ChatSearchBar = () => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:ring-gray-500 transition-all"
          />
        </div>
      </div>
  )
}

export default ChatSearchBar