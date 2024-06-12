import { useEffect, useState, useRef } from "react";
import { getMessages, getUser, addMessage } from "../../helpers/api-communicator";
import { Types } from "mongoose";
import { IoMdSend } from "react-icons/io";
import { Box, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material";

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
  role: string;
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

const TeacherChat = (props: { classroom: Classroom; currentUser: any; }) => {
  const theme = useTheme();
  //@ts-ignore jljljl
  const [userData, setUserData] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const scroll = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // fetching data for header
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
        const data = await getMessages(props.classroom.id);
        setMessages(data.filter((message) => message.teacherStudent));
      } catch (error) {
        console.log(error);
      }
    };

    if (props.classroom !== null) fetchMessages();
  }, [props.classroom]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   if (props.receivedMessage !== null && props.receivedMessage.teacherStudent == true) {
  //     setMessages([...messages, props.receivedMessage])
  //   }
  // },[props.receivedMessage])

  const handleSend = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const message: Message = {
      senderId: props.currentUser._id,
      text: content,
      classroomId: props.classroom.id,
      teacherStudent: true,
      role: props.currentUser.isTeacher ? "teacher" : "student",
    };
    // send message to socket
    // console.log("Sending message to socket:", message);
    // props.handleSetSocketMessage(message)

    // send message to database
    try {
      const data = await addMessage(message);
      setMessages([...messages, data]);
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <Box className="ChatBox-container" sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        width: "100%",
        alignContent: "space-between",
        border: "1px solid",
        borderRadius: "10px",
        bgcolor: "primary.light",
        [theme.breakpoints.up('sm')]: {
          maxWidth: "500px",
        },
      }}>
        <Box className="chat-body"
          sx={{
            backgroundColor: "transparent",
            display: "flex",
            flex: "1",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "1.5rem",
            overflowY: "auto"
          }}
        >
          {messages?.map((message) => (
            <Box
              key={message.createdAt}
              ref={scroll}
              sx={{
                padding: "0.7rem",
                borderRadius: message.senderId !== props.currentUser._id ? "1rem 1rem 1rem 0" : "1rem 1rem 0 1rem",
                maxWidth: "28rem",
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignSelf: message.senderId !== props.currentUser._id ? "flex-start" : "flex-end",
                bgcolor: message.senderId !== props.currentUser._id ? "white" : "secondary.main",
              }}
            >
              <Typography
                variant="body2"
                alignSelf={"end"}
                color={message.senderId !== props.currentUser._id ? "primary" : "white"}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* chat-sender */}
        <Box
          className="chat-sender"
          sx={{
            bgcolor: "primary.light",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0 0 10px 10px",
            padding: "10px",
          }}
        >
          <TextField
            inputRef={inputRef}
            fullWidth
            type="text"
            variant="outlined"
            sx={{ bgcolor: "primary.light" }}
            InputProps={{
              sx: { borderRadius: "50px", bgcolor: "white", height:"40px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSend} sx={{ color: "black", mx: 1 }}>
                    <IoMdSend />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default TeacherChat;
