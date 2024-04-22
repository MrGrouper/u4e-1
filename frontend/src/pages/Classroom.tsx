// import  { useEffect, useRef, useState } from "react";
//@ts-expect-error not used
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
// import red from "@mui/material/colors/red";
// import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import TeacherChat from "../components/chat/TeacherChat";
import AiChat from "../components/chat/AiChat";
// import {Socket, io} from "socket.io-client";
// import AiChat from "../components/chat/aiChat";

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

const Classroom = (props: {handleSetSocketMessage, receivedMessage}) => {
  const location = useLocation();
  const { data, currentUser } = location.state;

  return (
    <>
      <div className="classroom-container">
        <Box
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            flexDirection: "column",
            flexGrow: "0",
            height: "100%",
            alignItems: "center",
            gap: "20px",
          }}
        >
          { currentUser.isTeacher == false &&
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "30px",
                color: "#fffffe",
                fontWeight: "bold"
              }}
            >
              Hi {currentUser.firstname}!
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                color: "#e8e4e6",
              }}
            >
              Welcome to {data.subject}.
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                color: "#e8e4e6",
              }}
            >
              Chat with your instructor below and your AI teacher in the bigger
              box
            </Typography>
          </Box>
}
{ currentUser.isTeacher &&
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "30px",
                color: "#fffffe",
                fontWeight: "bold"
              }}
            >
              Hi {currentUser.firstname}!
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                color: "#e8e4e6",
              }}
            >
              You are instructing {data.subject}.
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                color: "#e8e4e6",
              }}
            >
              Chat with your student below and give the AI teacher instructions in the bigger
              box
            </Typography>
          </Box>
}
          <TeacherChat 
          classroom={data} 
          currentUser={currentUser} 
          handleSetSocketMessage = {props.handleSetSocketMessage} 
          receivedMessage={props.receivedMessage}
          />
        </Box>
        <Box>
          <AiChat 
          classroom={data}
           currentUser={currentUser}
           handleSetSocketMessage = {props.handleSetSocketMessage} 
           receivedMessage={props.receivedMessage}
            />
        </Box>
      </div>
    </>
  );
};

export default Classroom;
