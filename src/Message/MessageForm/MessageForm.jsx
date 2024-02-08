// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSendMessageMutation } from "@/redux/features/messages/messagesApi";
// import { io } from "socket.io-client";

// const socket = io('https://localhost:5000', { transports : ['websocket'] });

// const MessageForm = () => {
//   const dispatch = useDispatch();
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null);

//   const [sendMessage, { isLoading, isError }] = useSendMessageMutation();

//   useEffect(() => {
//     socket.on("message", (newMessage) => {
//       // dispatch(messageAdded(newMessage));
//       console.log(newMessage);
//     });
//   }, [dispatch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Call the mutation function
//     sendMessage({ content, image })
//       .unwrap()
//       .then((data) => {
//         socket.emit("message", data);
//         console.log(data);
//         alert("Message sent successfully!");
//       })
//       .catch((error) => {
//         console.error("Error sending message:", error);
//       });

//     setContent("");
//     setImage(null);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Message:
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Image:
//         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//       </label>
//       <br />
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Sending..." : "Send Message"}
//       </button>
//       {isError && <p>Error sending message.</p>}
//     </form>
//   );
// };

// export default MessageForm;
