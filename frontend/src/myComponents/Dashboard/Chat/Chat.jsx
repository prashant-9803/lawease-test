import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageInput from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "@/services/operations/chatAPI";
import { addMessage, setMessages, setOnlineUsers } from "@/slices/chatSlice";
import { SocketContext } from "@/context/SocketContext";
import { io } from "socket.io-client";

const Chat = () => {
  const { currentChatUser, messageSearch } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const { setSocket } = useContext(SocketContext);
  const socket = useRef(null);
  const [socketEvent, setSocketEvent] = useState(false);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {

        console.log("message received: ", data);
        dispatch(
          addMessage({
            ...data.message,
            fromSelf: true,
          })
        );
      });

      socket.current.on("online-users", ({ onlineUsers }) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
  
    if (user) {
      console.log("user: ", user);
      console.log("server url", SERVER_URL);
      socket.current = io(SERVER_URL);
      console.log("socket: ", socket.current);
      socket.current.emit("add-user", user._id);
      setSocket(socket);
    }
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getMessages(token, user?._id, currentChatUser?._id);
      console.log("seting res", res);
      dispatch(setMessages(res));
    };
    if (token && currentChatUser) {
      fetchMessages();
    }
  }, [currentChatUser, token]);

  return (
    <div className="flex h-full max-w-[100%] w-full overflow-hidden rounded-xl border dark:bg-black animate-fade-in ">
      <ChatSidebar />
      <div className="flex-1 flex flex-col max-w-[679px]">
        {currentChatUser ? (
          <div className={`flex flex-col h-full max-h-[700px] justify-between`}>
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
