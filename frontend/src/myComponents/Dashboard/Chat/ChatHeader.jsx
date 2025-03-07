import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatHeader() {
  const { currentChatUser, onlineUsers } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex items-center justify-between transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-3">
        <Avatar
        // className={`${contact?.status === "online" ? "animate-pulse-slow" : ""} animate-subtle-shine`}
        >
          <AvatarImage src={currentChatUser?.image} alt={"contactavatar"} />
          <AvatarFallback>
            {currentChatUser?.firstName} {currentChatUser?.lastName}
          </AvatarFallback>
        </Avatar>
        <div className="animate-fade-in">
          <h2 className="font-semibold text-black dark:text-white">
            {" "}
            {currentChatUser?.firstName} {currentChatUser?.lastName}
          </h2>
          {onlineUsers.includes(currentChatUser?._id) ? (
            <p className="text-xs text-green-500">Online</p>
          ) : (
            <p className="text-xs text-gray-500">Offline</p>
          )}
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
  );
}
