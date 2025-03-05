import React from "react";
import { useState } from "react"
import ChatSidebar from "./ChatSidebar"
import ChatHeader from "./ChatHeader"
import ChatContainer from "./ChatContainer"
import MessageInput from "./MessageInput"

const Chat = () => {


  const [activeChatId, setActiveChatId] = useState("1")

  // User information
  const user = {
    name: "Alex Morgan",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  }
  // Enhanced contacts with unread count and message status
  const contacts = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "Hey, how are you doing?",
      time: "10:30 AM",
      unread: 0,
      messageStatus: "read", // 'sent', 'delivered', 'read'
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "Did you see the latest update?",
      time: "Yesterday",
      unread: 3,
      messageStatus: "delivered",
    },

  ]

  const activeContact = contacts.find((contact) => contact.id === activeChatId)

 

  return (
    <div className="flex h-dvh bg-white dark:bg-black animate-fade-in">
      <ChatSidebar user={user} contacts={contacts} activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
      <div className="flex-1 flex flex-col">
        <ChatHeader contact={activeContact} />
        <ChatContainer />
        <MessageInput />
      </div>
    </div>
  )
}

export default Chat