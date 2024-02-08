// ActivityChat.jsx

import React, { useState, useEffect } from "react";
import { MdPhoto, MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { FiDownload } from "react-icons/fi";

import { format } from "date-fns";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  useGetCurrentUserQuery,
  useGetRoleByEmailQuery,
} from "@/redux/features/adminUser/adminUserApi";
import { useGetIdByEmailQuery } from "@/redux/features/roleManage/roleApi";
import { app } from "@/firebase/firebase.config";
import { useOnlineUsers } from "@/Pages/Inbox/onlineUsersContext";
import { Link } from "react-router-dom";
import { useGetMessagesByReceiverIdQuery } from "@/redux/features/messages/messagesApi";

const socket = io("http://localhost:5000");

const ActivityChat = ({ customerId, adminId: adminUserId }) => {
  console.log(customerId, adminUserId);
  const messagesEndRef = React.useRef(null);
  const { email } = useSelector((state) => state.userSlice);
  const { data: userId } = useGetIdByEmailQuery(email);
  const [messages, setMessages] = useState([]);
  const [isUploading, setIsUploading] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: role } = useGetRoleByEmailQuery({ email });
  const receiverId = role === "admin" ? customerId : adminUserId;
  const [inputMessage, setInputMessage] = useState("");
  const id = userId;
  const { data: currentUserData, isLoading } = useGetCurrentUserQuery(email);
  const storage = getStorage(app);

  const { data: reciverAndMyMessage, refetch } =
    useGetMessagesByReceiverIdQuery({ receiverId: receiverId, senderId: id });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentUser = {
    id: id,
    name: role === "admin" ? "Admin" : "Customer",
  };

  const { onlineUsers, updateOnlineStatus } = useOnlineUsers();
  useEffect(() => {
    socket.on("updateOnlineStatus", (data) => {
      updateOnlineStatus(data);
    });

    // Cleanup
    return () => {
      socket.off("updateOnlineStatus");
    };
  }, [updateOnlineStatus]);

  useEffect(() => {
    const connectToSocket = () => {
      socket.emit("userConnected", { userId: id });

      return () => {
        socket.off("connect");
      };
    };

    connectToSocket();

    return () => {
      socket.off("userConnected");
    };
  }, [id]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const imageUrls = [];

    setIsUploading(true); // Start uploading

    Array.from(files).forEach((file) => {
      const storageRef = ref(storage, `/images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
          setIsUploading(false); // Stop uploading on error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            imageUrls.push({
              imageUrl: downloadURL,
              imageName: file.name,
              imageSize: file.size,
            });
            setSelectedImage(imageUrls);
            setIsUploading(false); // Stop uploading when done
          });
        }
      );
    });
  };

  const handleSendMessage = async () => {
    try {
      const response = {
        content: inputMessage,
        senderId: id,
        receiverId: receiverId,
        adminUserId: role === "admin" ? id : receiverId,
        customerId: role === "customer" ? id : receiverId,
        imageUrls: selectedImage,
      };

      console.log(`Sending message to server:`, response);

      socket.emit("newMessage", response);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInputMessage("");
    setSelectedImage(null);
  };

  useEffect(() => {
    if (receiverId) {
      refetch();
      setMessages(reciverAndMyMessage?.[0]?.Message);
    }
  }, [receiverId, refetch, reciverAndMyMessage]);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      if (data.receiverId === userId || data.senderId === userId) {
        setMessages((prevMessages) => [...(prevMessages || []), data]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [userId]);

  function shortenFileName(fileName, maxLength = 15) {
    if (fileName.length <= maxLength) {
      return fileName;
    }

    const start = fileName.substr(0, maxLength / 2);
    const end = fileName.substr(-maxLength / 2);
    return `${start}...${end}`;
  }

  console.log(messages);

  return (
    <div className="bg-white">
      {/* Top Part */}
      <div className="pb-4 border-b-2 bg-gray-200 p-3">
        <h2 className="text-xl font-semibold">{currentUserData?.name}</h2>
      </div>

      {/* Middle Part */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-450px)]">
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <div
              key={message.id}
              // className={`mb-4 flex ${
              //   message.senderId === currentUser.id
              //     ? "justify-end"
              //     : "justify-start"
              // }`}
            >
              <div className={`rounded-lg overflow-hidden`}>
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full">
                      <img
                        className="object-cover w-8 h-8 rounded-full"
                        src={
                          message?.Chat?.adminUser?.id === message.senderId
                            ? message?.Chat?.adminUser?.image
                            : message?.Chat?.customer?.id === message.senderId
                            ? message?.Chat?.customer?.image
                            : null
                        }
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold mb-1">
                          {message?.Chat?.adminUser?.id === message.senderId
                            ? message?.Chat?.adminUser?.name
                            : message?.Chat?.customer?.id === message.senderId
                            ? message?.Chat?.customer?.name
                            : null}
                        </p>
                        <p className="text-xs">
                          {format(
                            new Date(message.createdAt),
                            "MMM d, yyyy, h.mm aa"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">{message?.content}</p>
                        <div className="grid grid-cols-3 gap-3">
                          {message.imageMessages &&
                            message.imageMessages.map((imageMessage) => (
                              <div key={imageMessage.id}>
                                <img
                                  src={imageMessage.imageUrl}
                                  alt="Image"
                                  className="w-60 object-cover mt-2"
                                />
                                <div className="pt-2 flex gap-2">
                                  <Link
                                    to={imageMessage.imageUrl}
                                    target="_blank"
                                    download={shortenFileName(
                                      imageMessage?.imageName
                                    )}
                                  >
                                    <button>
                                      <FiDownload className="text-blue-500" />
                                    </button>
                                  </Link>
                                  <p>
                                    {shortenFileName(imageMessage?.imageName)}
                                  </p>
                                  <p>
                                    (
                                    {(
                                      parseInt(imageMessage?.imageSize) / 10000
                                    ).toFixed(2)}
                                    ) kb
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Part */}
      <div className="p-4 border-t border-gray-300 flex-shrink-0">
        <div className="flex items-center">
          <label htmlFor="imageUpload" className="cursor-pointer mr-4">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
            />
            <MdPhoto
              size={24}
              className="text-gray-600 hover:text-blue-500 cursor-pointer"
            />
          </label>

          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />

          <button
            className="ml-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            onClick={handleSendMessage}
            disabled={isUploading && !inputMessage}
          >
            <MdSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityChat;
