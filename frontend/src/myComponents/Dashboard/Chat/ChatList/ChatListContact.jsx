import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { setContactsPage, setCurrentChatUser } from '@/slices/chatSlice'
import { calculateTime } from '@/utils/CalculateTime'
import { Camera, Mic } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ChatListContact = ({data}) => {

    const dispatch = useDispatch()    
    const {user} = useSelector(state => state.profile)

    const handleContactClick = () => {
        dispatch(setCurrentChatUser(data?._doc))
        dispatch(setContactsPage(false))
    }

  return (
    <div className="p-2">
        <button
          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left mb-1 transition-all duration-100  transform hover:scale-[1.02] 
            dark:bg-gray-900"  hover:bg-gray-50 dark:hover:bg-gray-950`}
   //   onClick={() => setActiveChatId(contact.id)}
        >
          <div className="relative">
            <Avatar
            // className={contact.status === "online" ? "animate-pulse-slow" : ""}
            >
              <AvatarImage src={data?._doc?.image} alt={"contactaAvatar"} />
              <AvatarFallback>
                {/* {contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")} */}
                {data?._doc?.firstName} {data?._doc?.lastName}
              </AvatarFallback>
            </Avatar>
            {/* {contact.status === "online" && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>
            )} */}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium truncate text-black dark:text-white">
                {data?._doc?.firstName} {data?._doc?.lastName}
              </h3>
              <span className="text-xs text-gray-500">{calculateTime(data?.createdAt)}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 truncate">
                {data?.type === "text" && <span className='flex items-center '>{data?.message}</span> }
                {data?.type === "audio" && <span className='flex items-center '><Mic height={18}/>Audio</span> }
                {data?.type === "image" && <span className='flex items-center'><Camera height={18}/>Image</span> }
              </p>

              {/* message status tikcon */}

              {/* {contact.unread > 0 ? (
                <span className="ml-2 flex items-center justify-center size-5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full animate-bounce-subtle">
                  {contact.unread}
                </span>
              ) : (
                renderMessageStatus(contact.messageStatus)
              )} */}
            </div>
          </div>
        </button>
      </div>
  )
}

export default ChatListContact