import React, { useState } from "react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = e => {
    setMessage(e.target.value);
  };

  const handleSendText = () => {
    // Implement logic to send text message
    console.log("Sending text message:", message);

    // Clear the input field after sending
    setMessage("");
  };

  const handleSendImage = e => {
    // Implement logic to send image
    const imageFile = e.target.files[0];
    console.log("Sending image:", imageFile);

    // Clear the input field after sending
    setMessage("");
  };

  return (
    <div className="flex items-center border-t-2 pt-4">
      {/* Input field for typing messages */}
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        className="flex-1 p-2 border rounded-l focus:outline-none"
      />

      {/* Button to send text message */}
      <button
        onClick={handleSendText}
        className="px-4 py-2 bg-blue-500 text-white rounded-r"
      >
        Send
      </button>

      {/* Input field for uploading images */}
      <input
        type="file"
        accept="image/*"
        onChange={handleSendImage}
        className="hidden"
        id="imageInput"
      />

      {/* Button to trigger image upload */}
      <label htmlFor="imageInput">
        <button className="px-4 py-2 bg-green-500 text-white rounded-r">
          Image
        </button>
      </label>
    </div>
  );
};

export default ChatInput;
