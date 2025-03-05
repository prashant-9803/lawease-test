import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Video, MoreVertical } from "lucide-react"

export default function ChatHeader({ contact }) {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex items-center justify-between transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-3">
        <Avatar className={`${contact?.status === "online" ? "animate-pulse-slow" : ""} animate-subtle-shine`}>
          <AvatarImage src={contact?.avatar} alt={contact?.name} />
          <AvatarFallback>
            {contact?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="animate-fade-in">
          <h2 className="font-semibold text-black dark:text-white">{contact?.name}</h2>
          <p className={`text-xs ${contact?.status === "online" ? "text-green-500" : "text-gray-500"}`}>
            {contact?.status === "online" ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-transform hover:scale-110 rounded-full"
        >
          <Phone className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-transform hover:scale-110 rounded-full"
        >
          <Video className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-transform hover:scale-110 rounded-full"
        >
          <MoreVertical className="size-5" />
        </Button>
      </div>
    </div>
  )
}

