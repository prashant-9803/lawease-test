import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, MessageSquareDashed, MessageSquareDot  } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { setContactsPage } from '@/slices/chatSlice'


const ChatSidebarHeader = () => {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch()



  const handleAllContactsPage = () => {
    dispatch(setContactsPage(true))
  }


  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Avatar className="animate-subtle-shine">
            <AvatarImage src={user?.image}  alt={"userName"} />
            <AvatarFallback>
                {user?.firstName} {user?.lastName}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-md text-black dark:text-white">{user?.firstName} {user?.lastName}</h1>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            title="New chat"
            onClick={handleAllContactsPage}
          >
            <MessageSquareDot  className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
  )
}

export default ChatSidebarHeader