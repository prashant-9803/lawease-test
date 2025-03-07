import React, { useEffect } from "react";
import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageInput from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/services/operations/chatAPI";
import { setMessages } from "@/slices/chatSlice";

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState("1");

  const { currentChatUser, messageSearch } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const activeContact = contacts.find((contact) => contact.id === activeChatId)
  useEffect( () => {
    const fetchMessages = async () => {
      const res = await getMessages(token, user?._id, currentChatUser?._id);
      console.log("seting res", res);
      dispatch(setMessages(res));
    };
    if (token && currentChatUser) {
      fetchMessages()
    }
  }, [currentChatUser, token]);

  return (
    <div className="flex h-full max-w-[100%] w-full overflow-hidden rounded-xl border dark:bg-black animate-fade-in ">
      <ChatSidebar />
      <div className="flex-1 flex flex-col max-w-[679px]">
        {currentChatUser ? (
          <div
            className={`flex flex-col h-full max-h-[700px] justify-between`}
          >
            <ChatHeader />
            <ChatContainer/>
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
