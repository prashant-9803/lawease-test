import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getContacts } from "@/services/operations/chatAPI";
import { setContactsPage } from "@/slices/chatSlice";
import { Search, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./Contact";

const ContactsList = () => {
  const { token } = useSelector((state) => state.auth);
  console.log("from fe: ", token);

  const dispatch = useDispatch();
  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContacts, setSearchContacts] = useState([]);

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const contacts = await getContacts(token);
        setAllContacts(contacts);
        setSearchContacts(contacts);
      } catch (error) {
        console.log("ERROR WHILE GETTING CONTACTS", error);
      }
    };
    if (token) {
      getAllContacts();
    }
  }, [token]);

  return (
    <div className="w-80 border-e border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex flex-col transition-all duration-300 ease-in-out animate-fade-in  ">
      {/* View Title */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex gap-2">
        <button onClick={() => dispatch(setContactsPage(false))}>
          <ChevronLeft className="font-medium text-black dark:text-white" />
        </button>
        <h2 className="font-medium text-black dark:text-white px-2 py-3">All Contacts</h2>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 mb-5">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search contacts..."
            className="pl-8 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:ring-gray-500 transition-all"
          />
        </div>
      </div>

      {/* Contacts List */}
      <ScrollArea className="flex-1">
        {Object.entries(searchContacts).map(([initialLetter, userList]) => 
          userList.length > 0 && (
            <div key={Date.now() + initialLetter} className="">
                <div className="text-sm text-gray-500 dark:text-gray-400 px-5 font-semibold ">
                  {initialLetter}
                </div>
                {
                  userList.map((contact) => (
                    <Contact data={contact} key={contact._id}/>
                  ))
                }
            </div>
          )
        )}
      </ScrollArea>
    </div>
  );
};

export default ContactsList;
