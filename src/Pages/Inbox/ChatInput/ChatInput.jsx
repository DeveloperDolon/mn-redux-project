import React, { useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";
const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendText = () => {
    // Implement logic to send text message
    console.log("Sending text message:", message);

    // Clear the input field after sending
    setMessage("");
  };

  const fileInputRef = useRef(null);

  const handleImageIconClick = () => {
    // Trigger a click on the hidden file input
    fileInputRef.current.click();
  };

  const handleSendImage = (e) => {
    // Handle the image upload logic
    const selectedImage = e.target.files[0];
    // Add your logic to send the image
    console.log("Selected Image:", selectedImage);
  };

  return (
    <div className="flex items-center p">
      <div onClick={handleImageIconClick} className="text-2xl bg-gray-100 p-2 ">
        <MdAttachFile />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleSendImage}
        id="imageInput"
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        className="flex-1 p-2 border rounded-l focus:outline-none"
      />

      <button
        onClick={handleSendText}
        className="px-4 py-2 bg-blue-500 text-white rounded-r"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
