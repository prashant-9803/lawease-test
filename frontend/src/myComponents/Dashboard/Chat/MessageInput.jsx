import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, Paperclip, Mic, SendHorizontal, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/services/operations/chatAPI";
import { addMessage } from "@/slices/chatSlice";
import { sendImageMessage } from "@/services/operations/chatAPI";

export default function MessageInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { currentChatUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");

  const photoPickerChange = async () => {
    const res = await sendImageMessage(token, selectedImage, user._id, currentChatUser._id);
    if (res.success) {
      console.log(res.data);
      dispatch(
        addMessage({
          ...res.message,
          fromSelf: true,
        })
      );
    }
    setSelectedImage(null);
    setImagePreviewUrl("");
    fileInputRef.current.value = "";
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl("");
    fileInputRef.current.value = "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      photoPickerChange();
      return;
    }
    console.log("Message: ", message);
    const data = await sendMessage(token, {
      from: user._id,
      to: currentChatUser._id,
      message,
    });
    console.log("Data: ", data);
    dispatch(
      addMessage({
        ...data.message,
        fromSelf: true,
      })
    );

    setMessage("");  };

  // Handle file selection
  const handleFileChange = (e) => {
    console.log("File selected:", e.target.files[0]);
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      console.log("Image preview URL:", imagePreviewUrl);
    }
  };

  // Open file picker when paperclip is clicked
  const handlePaperclipClick = () => {
    console.log("Paperclip clicked");
    fileInputRef.current.click();
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-all duration-300 ease-in-out">
      {/* Image preview area */}
      {imagePreviewUrl && (
        <div className="mb-3 relative animate-slide-in-left">
          <div className="relative inline-block">
            <img
              src={imagePreviewUrl || "/placeholder.svg"}
              alt="Selected image"
              className="h-24 rounded-lg border border-gray-200 dark:border-gray-800 object-cover"
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={removeSelectedImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Button
          onClick={handlePaperclipClick}
          type="button"
          variant="ghost"
          size="icon"
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-transform hover:scale-110"
        >
          <Paperclip className="size-5" />
        </Button>
        <div
          className={`relative flex-1 transition-all duration-300 ${
            isFocused ? "scale-[1.01]" : ""
          }`}
        >
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            className="bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-black dark:text-white focus:ring-gray-500 transition-all pr-10 rounded-full"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-black dark:text-white hover:bg-transparent"
            onClick={onSubmit}
          >
            <SendHorizontal className="size-5" />
          </Button>
        </div>
        {/* 
          <Button
            type="button"
            size="icon"
            className={`${isRecording ? "bg-red-500" : "bg-black dark:bg-white"} text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:scale-110 ${isRecording ? "animate-pulse" : ""} rounded-full`}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic className="size-5" />
          </Button>
        )} */}
      </form>
    </div>
  );
}
