// import  { useEffect, useRef, useState } from "react";
//@ts-expect-error not used
import { Box, Avatar, Typography, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
// import red from "@mui/material/colors/red";
// import { useAuth } from "../context/AuthContext";
import { getClassroomById, getSubject } from "../helpers/api-communicator";
import { useParams } from "react-router-dom";
import TeacherChat from "../components/chat/TeacherChat";
import AiChat from "../components/chat/AiChat";
import ChatDrawer from "../components/drawer/ChatDrawer";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
// import {Socket, io} from "socket.io-client";
// import AiChat from "../components/chat/aiChat";

// import ChatItem from "../components/chat/ChatItem";
// import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
//   sendInitialChatRequest,
// } from "../helpers/api-communicator";
// import toast from "react-hot-toast";

const Classroom = (props: {handleSetSocketMessage, receivedMessage}) => {
  // const Classroom = () => {
    const auth = useAuth()
    const currentUser = auth.user
    const { id } = useParams()
    const navigate = useNavigate()

    console.log('id', id)

  // const location = useLocation();
  // const { data, currentUser } = location.state;

  const [data, setData] = useState(null)
  const [subject, setSubject] = useState(null)

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {

    const handleData = async () => {
      try {
      const classroom = await getClassroomById(id)
      const subject = await getSubject(classroom.subjectId)
      console.log([classroom, subject])
      setData(classroom)
      setSubject(subject)
    }
      catch (error) {
        console.log(error)
    }}
    if (auth?.isLoggedIn && auth.user){
      handleData()
    }

}, []);


  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"))

  if (subject){
  return (
    <>
      <Box
      sx= {{
        display: "flex",
        flexDirection: {md: 'row', xs: 'column-reverse', sm: 'column-reverse'},
        marginTop: '65px',
        height: '100vh-65px',
        alignItems: 'center',
        gap: '20px',
        padding: '20px',
        backgroundColor: 'transparent'

      }}
      >
        {isMatch ? <ChatDrawer 
                  classroom={data} 
                  currentUser={currentUser}
                  handleSetSocketMessage = {props.handleSetSocketMessage} 
                  receivedMessage={props.receivedMessage} 
                  />
        
        : <Box
          sx={{
            // display: { md: "flex", xs: "none", sm: "none" },
            display:"flex",
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
              Welcome to {subject.name}.
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
              You are instructing {subject.name}.
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
        </Box>}
        <Box>
          <AiChat 
          classroom={data}
           currentUser={currentUser}
           handleSetSocketMessage = {props.handleSetSocketMessage} 
           receivedMessage={props.receivedMessage}
            />
        </Box>
        </Box>
    </>
  );
}
else {return (<></>)}
  }

export default Classroom;
