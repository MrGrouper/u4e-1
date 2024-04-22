// import  { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
// import red from "@mui/material/colors/red";
// import { useAuth } from "../context/AuthContext";
// import ChatItem from "../components/chat/ChatItem";
// import { IoMdSend } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
//   sendInitialChatRequest,
// } from "../helpers/api-communicator";
// import toast from "react-hot-toast";
// import { Messenger } from "../components/chat/Messenger";
// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };
// const Chat = () => {
//   const navigate = useNavigate();
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const auth = useAuth();
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const handleSubmit = async () => {
//     const content = inputRef.current?.value as string;
//     if (inputRef && inputRef.current) {
//       inputRef.current.value = "";
//     }
//     const newMessage: Message = { role: "user", content };
//     setChatMessages((prev) => [...prev, newMessage]);
//     const chatData = await sendChatRequest(content);
//     setChatMessages([...chatData.chats]);
//     //
//   };
//   const handleDeleteChats = async () => {
//     try {
//       toast.loading("Deleting Chats", { id: "deletechats" });
//       await deleteUserChats();
//       setChatMessages([]);
//       toast.success("Deleted Chats Successfully", { id: "deletechats" });
//     } catch (error) {
//       console.log(error);
//       toast.error("Deleting chats failed", { id: "deletechats" });
//     }
//   };

//   useEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       getUserChats().then((data) => {
//         if (data.chats.length == 0) {
//           sendInitialChatRequest(
//             "You are an ai teacher teaching 5th grade math. You are communicating with the user. Your job is to teach the user 5th grade in great depth. The topic you will cover are: decimals, multiplication and division of fractions, geometry, fractions, place value, add and subtract fractions, and coordinate plane. Cover these individually until the user has a good grasp of the subject. Ask the user example questions for them to solve. Begin by asking me if i am ready to start learning math. Wait for response. If they respond with yes, begin teaching."
//           );
//           console.log(data);
//         }
    
//       });
//     }
//   });

//   useLayoutEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Chats", { id: "loadchats" });
//       getUserChats()
//         .then((data) => {
//           data.chats.shift();
//           setChatMessages([...data.chats]);
//           toast.success("Successfully loaded chats", { id: "loadchats" });
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error("Loading Failed", { id: "loadchats" });
//         });
//     }
//   }, [auth]);

//   useEffect(() => {
//     if (!auth?.user) {
//       return navigate("/login");
//     }
//   }, [auth]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flex: 1,
//         width: "100%",
//         height: "100%",
//         mt: 3,
//         alignItems: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: { md: "flex", xs: "none", sm: "none" },
//           flex: 0.2,
//           flexDirection: "column",
//           height: "100%",
//           alignItems: "center",
//           gap: "20px"

//         }}
//       >
//          <Box
//           sx={{
//             display: "flex",
//             width: "100%",
//             height: "20vh",
//             bgcolor: "rgb(17,29,39)",
//             borderRadius: 5,
//             flexDirection: "column",
//             mx: 3,
//             paddingBottom: "20px"
//           }}
//         >
//           <Avatar
//             sx={{
//               mx: "auto",
//               my: 2,
//               bgcolor: "white",
//               color: "black",
//               fontWeight: 700,
//             }}
//           >
//             {/* {auth?.user?.name[0]} */}
//             {/* {auth?.user?.name.split(" ")[1][0]} */}
//           </Avatar>
//           <Button
//             onClick={handleDeleteChats}
//             sx={{
//               width: "200px",
//               my: "auto",
//               color: "white",
//               fontWeight: "700",
//               borderRadius: 3,
//               mx: "auto",
//               bgcolor: red[300],
//               ":hover": {
//                 bgcolor: red.A400,
//               },
//             }}
//           >
//             Clear Conversation
//           </Button>
//         </Box>
//         <Messenger />
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flex: { md: 0.8, xs: 1, sm: 1 },
//           flexDirection: "column",
//           px: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "40px",
//             color: "white",
//             mb: 2,
//             mx: "auto",
//             fontWeight: "600",
//           }}
//         >
//           Math
//         </Typography>
//         <Box
//           sx={{
//             width: "100%",
//             height: "55vh",
//             borderRadius: 3,
//             mx: "auto",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "scroll",
//             overflowX: "hidden",
//             overflowY: "auto",
//             scrollBehavior: "smooth",
//           }}
//         >
//           {chatMessages.map((chat, index) => (
           
//             <ChatItem content={chat.content} role={chat.role} key={index} />
//           ))}
//         </Box>
//         <div
//           style={{
//             width: "100%",
//             borderRadius: 8,
//             backgroundColor: "rgb(17,27,39)",
//             display: "flex",
//             margin: "auto",
//           }}
//         >
//           {" "}
//           <input
//             ref={inputRef}
//             type="text"
//             style={{
//               width: "100%",
//               backgroundColor: "transparent",
//               padding: "30px",
//               border: "none",
//               outline: "none",
//               color: "white",
//               fontSize: "20px",
//             }}
//           />
//           <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
//             <IoMdSend />
//           </IconButton>
//         </div>
//       </Box>
//     </Box>
//   );
// };

// export default Chat;
