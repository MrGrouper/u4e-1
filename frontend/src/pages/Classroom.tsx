// import  { useEffect, useRef, useState } from "react";

import { Box } from "@mui/material";
import { getClassroomById, getUser } from "../helpers/api-communicator";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
// import TeacherChat from "../components/chat/TeacherChat";
import AiChat from "../components/chat/AiChat";
import ChatDrawer from "../components/drawer/ChatDrawer";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
// import {Socket, io} from "socket.io-client";
// import AiChat from "../components/chat/aiChat";

// import ChatItem from "../components/chat/ChatItem";
// import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/shared/LoadingPage";
import ErrorWithPage from "../components/shared/ErrorWithPage";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
//   sendInitialChatRequest,
// } from "../helpers/api-communicator";
// import toast from "react-hot-toast";

// const Classroom = (props: {handleSetSocketMessage, receivedMessage}) => {
  const Classroom = () => {
    const auth = useAuth()
    const currentUser = auth?.user
    const { id } = useParams()
    const navigate = useNavigate()

  // const location = useLocation();
  // const { data, currentUser } = location.state;

  // const [data, setData] = useState(null)
  // const [subject, setSubject] = useState(null)

  useEffect(() => {
    if (!auth?.user || !auth.isLoggedIn) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  
  const { data: classroom } = useQuery({
    queryKey :["classroom", id], 
    queryFn: () => getClassroomById(id)})


    const otherUserId = currentUser?._id === classroom?.studentId ? classroom?.teacherId : classroom?.studentId
    
    const { isPending, isError, error, data: otherUser } = useQuery({
      queryKey: ["user", otherUserId],
      queryFn: () => getUser(otherUserId),
      enabled: !!otherUserId
    });

    if (isPending) {
      return <LoadingPage/>
    }
  
    if (isError) {
      console.log(error)
      return <ErrorWithPage/>
    }



  return (
<>
        <Box sx={{
          height: "100%",  
          display:"flex", 
          width:{md: "calc(100vw - 290px)"},
          alignItems:"center",
          justifyContent:"",
          flexDirection: "column-reverse",
          }}>
          <ChatDrawer 
                  classroom={classroom} 
                  currentUser={currentUser}
                  otherUser={otherUser}
                  isTeacher = {currentUser._id === classroom.teacherId ? true : false}
                  // handleSetSocketMessage = {props.handleSetSocketMessage} 
                  // receivedMessage={props.receivedMessage} 
                  />
          <AiChat 
          classroom={classroom}
           currentUser={currentUser}
           otherUser = {otherUser}
          //  handleSetSocketMessage = {props.handleSetSocketMessage} 
          //  receivedMessage={props.receivedMessage}
            />
            </Box>

        {/* </Box> */}
    </>
  );
}
  


export default Classroom;
