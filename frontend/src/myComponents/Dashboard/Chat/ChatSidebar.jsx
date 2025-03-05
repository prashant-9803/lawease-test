import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Menu, Check, CheckCheck } from "lucide-react"

export default function ChatSidebar({ user, contacts, activeChatId, setActiveChatId }) {
  // Function to render message status icon
  const renderMessageStatus = (status) => {
    switch (status) {
      case "sent":
        return <Check className="size-4 text-gray-500" />
      case "delivered":
        return <CheckCheck className="size-4 text-gray-500" />
      case "read":
        return <CheckCheck className="size-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="w-80 border-e border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex flex-col transition-all duration-300 ease-in-out">
      {/* Sidebar Header - Now showing user profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="animate-subtle-shine">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-lg text-black dark:text-white">{user.name}</h1>
            <p className="text-xs text-green-500">{user.status}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
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

      {/* Contacts List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left mb-1 transition-all duration-200 transform hover:scale-[1.02] ${
                contact.id === activeChatId ? "bg-gray-100 dark:bg-gray-900" : "hover:bg-gray-50 dark:hover:bg-gray-950"
              }`}
              onClick={() => setActiveChatId(contact.id)}
            >
              <div className="relative">
                <Avatar className={contact.status === "online" ? "animate-pulse-slow" : ""}>
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {contact.status === "online" && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate text-black dark:text-white">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 ? (
                    <span className="ml-2 flex items-center justify-center size-5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full animate-bounce-subtle">
                      {contact.unread}
                    </span>
                  ) : (
                    renderMessageStatus(contact.messageStatus)
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

