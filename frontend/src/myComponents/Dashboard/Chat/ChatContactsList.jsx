import React, { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialContacts } from "@/services/operations/chatAPI";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers, setUserContacts } from "@/slices/chatSlice";
import ChatListContact from "./ChatList/ChatListContact";

const ChatContactsList = () => {
  // ${
  //     contact.id === activeChatId ? "bg-gray-100 dark:bg-gray-900" : "hover:bg-gray-50 dark:hover:bg-gray-950"
  //   }

  const dispatch = useDispatch();


  const { token } = useSelector((state) => state.auth);
  const {user} = useSelector(state => state.profile)
  const {userContacts, filteredContacts} = useSelector(state => state.chat)


  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await getInitialContacts(token,user?._id );
        console.log("res form frontend: ", res);
        const { users, onlineUsers } = res
        console.log("res form frontend after destructuring: ", users, onlineUsers);

        dispatch(setOnlineUsers(onlineUsers))
        dispatch(setUserContacts(users))
      }
      catch (error) {
        console.log("ERROR WHILE GETTING CONTACTS", error);
      }
    }

    if(token) {
      getContacts()
    }

  }, [token])

  return (
    <ScrollArea className="flex-1">
      {
        userContacts.length > 0 ? (
          userContacts.map((contact) => (
            <ChatListContact key={contact._id} data={contact}/>
          ))
        ) : (<div></div>)
      }
    </ScrollArea>
  );
};

export default ChatContactsList;
