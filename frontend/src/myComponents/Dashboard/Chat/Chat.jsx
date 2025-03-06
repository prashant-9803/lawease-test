import React from "react";
import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState("1");

  const { currentChatUser, messageSearch } = useSelector((state) => state.chat);

  // const activeContact = contacts.find((contact) => contact.id === activeChatId)

  return (
    <div className="flex h-full w-full overflow-hidden rounded-xl border dark:bg-black animate-fade-in ">
      <ChatSidebar />
      <div className="flex-1 flex flex-col ">
        {currentChatUser ? (
          <div
            className={messageSearch ? "grid grid-cols-2" : "grid grid-cols-1 " }
          >
            <ChatHeader />
            <ChatContainer />
            <MessageInput />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            Demo UI current chat user not present
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
