import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setContactsPage, setCurrentChatUser } from "@/slices/chatSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Contact = ({ data }) => {

  const { currentChatUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch()

  const handleContactClick = () => {
    console.log("data: ", data);
    dispatch(setCurrentChatUser(data));
    console.log("current chat user: ", data);
    dispatch(setContactsPage(false));
  };


  return (
    <div className="px-1">
      <button
        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left mb-1 transition-all duration-100  transform hover:scale-[1.02] 
                 dark:bg-gray-900"  hover:bg-gray-50 dark:hover:bg-gray-950`}
          onClick={handleContactClick}
      >
        <div className="relative">
          <Avatar
          // className={contact.status === "online" ? "animate-pulse-slow" : ""}
          >
            <AvatarImage src={data?.image} alt={data?.firstName} />
            <AvatarFallback>
              {/* {contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")} */}
              {data?.firstName} {data?.lastName}
            </AvatarFallback>
          </Avatar>
          {/* {contact.status === "online" && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></span>
            )} */}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <h3 className="font-medium truncate text-black dark:text-white">
              {data?.firstName} {data?.lastName}
            </h3>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Contact;
