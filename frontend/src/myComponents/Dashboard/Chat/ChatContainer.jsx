import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, CheckCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { calculateTime } from "@/utils/CalculateTime";

export default function ChatContainer() {
  const messagesEndRef = useRef(null);
  const { messages } = useSelector((state) => state.chat);
  const { currentChatUser } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.profile);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to render message status icon
  const renderMessageStatus = (status = "sent") => {
    switch (status) {
      case "sent":
        return <Check className="size-4 text-gray-500" />;
      case "delivered":
        return <CheckCheck className="size-4 text-gray-500" />;
      case "read":
        return <CheckCheck className="size-4 text-blue-500" />;
      default:
        return <Check className="size-4 text-gray-500" />;
    }
  };

  return (
    <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-950">
      <div className="space-y-4">
        {messages &&
          messages.map((message, index) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender._id !== currentChatUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
              style={{
                animation: `${
                  message.sender._id !== currentChatUser._id
                    ? "slideInRight"
                    : "slideInLeft"
                } 0.4s ease-out forwards`,
                opacity: 0,
                
              }}
            >
              <div
                className={`rounded-lg px-3 py-2 shadow-sm text-wrap max-w-[50%] break-words ${
                  message.sender._id !== currentChatUser._id
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800"
                }`}
              >
                {message.type == "text" && (
                  <p className="w-full text-wrap">{message.message}</p>
                )}
                {message.type == "image" && (
                  <img
                    src={message.message}
                    alt={message.message}
                    height={200}
                    width={200}
                    className="mb-2"
                  />
                )}
                <div className="flex items-center justify-end mt-1 gap-1">
                  <span
                    className={`text-xs  ${
                      message.sender._id === currentChatUser._id
                        ? "text-gray-300 dark:text-gray-700"
                        : "text-gray-500"
                    }`}
                  >
                    {calculateTime(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
