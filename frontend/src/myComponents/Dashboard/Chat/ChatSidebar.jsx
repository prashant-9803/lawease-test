import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Menu, Check, CheckCheck } from "lucide-react";
import ChatSearchBar from "./ChatSearchBar";
import ChatContactsList from "./ChatContactsList";
import ChatSidebarHeader from "./ChatSidebarHeader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ContactsList from "./ChatList/ContactsList";

export default function ChatSidebar() {
  const { contactsPage } = useSelector((state) => state.chat);

  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    setPageType(contactsPage ? "all-contacts" : "default");
  }, [contactsPage]);

  return (
    <div className="w-80 border-e border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex flex-col transition-all duration-300 ease-in-out">
      {pageType === "default" && (
        <>
          <ChatSidebarHeader />
          <ChatSearchBar />
          <ChatContactsList />
        </>
      )}
      {
        pageType === "all-contacts" && (
          <ContactsList/>
        )
      }
    </div>
  );
}
