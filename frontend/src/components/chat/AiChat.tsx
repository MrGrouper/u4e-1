import { useEffect, useState, useRef } from "react";
import { getMessages, getUser, addAiMessage } from "../../helpers/api-communicator";
import ChatItem from "./ChatItem";
// import InputEmoji from "react-input-emoji";
import { Box, IconButton, TextField, InputAdornment, } from "@mui/material";
// import { format } from "timeago.js";
import { Types } from "mongoose";
import { toast } from "react-hot-toast";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


type Classroom = {
  id: string;
  members: string[];
  subjectId: string;
  messages: any[];
};

type Message = {
  classroomId: string;
  senderId: string;
  text: string;
  teacherStudent: boolean;
  role: string,
  createdAt?: string;
};

type User = {
  _id: Types.ObjectId;
  createdAt: string;
  email: string;
  firstname: string;
  isAdmin: boolean;
  isTeacher: boolean;
  lastname: string;
  subjects: string[];
  updatedAt: string;
};

const AiChat = (props: {
  classroom: Classroom;
  currentUser: any;
  // handleSetSocketMessage;
  // receivedMessage
}) => {
//@ts-expect-error dafas
  const [userData, setUserData] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const scroll = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    const userId = props.classroom?.members?.find(
      (id) => id !== props.currentUser._id
    );
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);

      } catch (error) {
        console.log(error);
      }
    };

    if (props.classroom !== null) getUserData();
  }, [props.classroom, props.currentUser._id]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // console.log(props.classroom)
        const data = await getMessages(props.classroom.id);
        setMessages(data.filter((message) =>message.teacherStudent == false));
      } catch (error) {
        console.log(error);
      }
    };

    if (props.classroom !== null) fetchMessages();
  }, [props.classroom]);


  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages)
  },[messages])

  // useEffect(() => {
  //   if (props.receivedMessage !== null && props.receivedMessage.teacherStudent == false && props.receivedMessage.senderId !== props.currentUser._id) {
  //     setMessages([...messages, props.receivedMessage])
  //   }
  // },[props.receivedMessage])


const handleSend = async () => {

    const content = inputRef.current?.value as string;
    console.log("content", content)
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const message: Message = {
      senderId: props.currentUser._id,
      text: content,
      classroomId: props.classroom.id,
      teacherStudent: false,
      role: (props.currentUser.isTeacher ? "teacher" : "student" )
    };
    setMessages(prev => [...prev, message])
    // send message to socket server
    // props.handleSetSocketMessage(message)
    // send message to database
    try {
      toast.loading('generating response')
      const data = await addAiMessage(message);
      toast.dismiss()
      setMessages(prev => [...prev, data]);
      // props.handleSetSocketMessage(data)
    } catch {
      console.log("error receiving AI Message");
      toast.error('could not generate response')
    }
  };


  return (
    <>
    <Box 
    className="ai-container" 
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems:"center",
      height:"calc(100% - 32px)",
      width: "100%",
      

  }}
    
    >
        {/* chat-body */}
        <Box className="ai-chat-body"
        sx={{
          display:"flex",
          flexDirection:"column",
          overflowY:"auto",
          flex:"1 1 auto",
          minHeight: "0px",
          padding: "20px 0 20px 0"



        }}
        >
          {messages?.map((message, index) => (
            <>
              <Box ref={scroll} paddingTop={"20px"}>
                {message.senderId === props.currentUser._id}
                <ChatItem content={message.text} role={message.role} key={index}
                currentUser={props.currentUser}

                // currentUser={message.senderId === props.currentUser._id ? props.currentUser : userData}
                />
              </Box>
            </>
          ))}
        </Box>
        {/* chat-sender */}
        <Box 
          className="ai-chat-sender"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth:"800px",
            width:"100%",
          }}
          
          >
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="outlined"
            type="text"
            InputProps={{
              sx: { borderRadius: "50px", bgcolor: "white", height:"40px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend} color="secondary"
                  size="small"
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}

          />
        </Box>
    </Box>
  </>
  );
}




export default AiChat;
