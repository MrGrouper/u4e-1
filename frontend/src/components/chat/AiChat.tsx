import { useEffect, useRef, useState } from "react";
import {
  getAIMessages,
  addAiMessage,
  ttsRequest,
} from "../../helpers/api-communicator";
import ChatItem from "./ChatItem";
// import InputEmoji from "react-input-emoji";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
// import { format } from "timeago.js";
// import { Types } from "mongoose";
// import { toast } from "react-hot-toast";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ChatItemLoading from "./ChatItemLoading";
import LoadingPage from "../shared/LoadingPage";
import ErrorWithPage from "../shared/ErrorWithPage";
import TextToSpeech from "./TextToSpeech";
// import Recorder from "./Recorder";

type Classroom = {
  id: string;
  studentId: string;
  teacherId: string;
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

// type User = {
//   _id: Types.ObjectId;
//   createdAt: string;
//   email: string;
//   firstname: string;
//   isAdmin: boolean;
//   isTeacher: boolean;
//   lastname: string;
//   subjects: string[];
//   updatedAt: string;
// };

const AiChat = (props: {
  classroom: Classroom;
  currentUser: any;
  otherUser: any;
  // handleSetSocketMessage;
  // receivedMessage
}) => {
  // const [userData, setUserData] = useState<User | null>(null);
  // const [messages, setMessages] = useState<Message[] | []>([]);
  const scroll = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  // const [transcript, setTranscript] = useState<string>("");
  const [audio, setAudio] = useState("");
  const [ttsOn, setTtsOn] = useState(false);

  //   useEffect(() => {
  //   if (transcript && inputRef.current) {
  //     inputRef.current.value = transcript;
  //   }
  // }, [transcript]);

  // console.log(transcript)

  // let otherUserId;

  // if (props.currentUser._id === props.classroom.studentId) {
  //   otherUserId = props.classroom.teacherId;
  // } else if (props.currentUser._id === props.classroom.teacherId) {
  //   otherUserId = props.classroom.studentId;
  // } else console.log("no matching user");

  // const otherUserQuery = useQuery({
  //   queryKey: ["user", otherUserId],
  //   queryFn: () => getUser(otherUserId),
  // });

  const messagesQuery = useQuery({
    queryKey: ["messages", props.classroom.id],
    queryFn: () => getAIMessages(props.classroom.id),
  });

  const messageMutation = useMutation({
    mutationFn: addAiMessage,
  });

  const audioMutation = useMutation({
    mutationFn: ttsRequest,
  });

  // useEffect(() => {
  //   const userId = props.classroom?.members?.find(
  //     (id) => id !== props.currentUser._id
  //   );
  //   const getUserData = async () => {
  //     try {
  //       const { data } = await getUser(userId);
  //       setUserData(data);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (props.classroom !== null) getUserData();
  // }, [props.classroom, props.currentUser._id]);

  // fetch messages
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       // console.log(props.classroom)
  //       const data = await getMessages(props.classroom.id);
  //       setMessages(data.filter((message) =>message.teacherStudent == false));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (props.classroom !== null) fetchMessages();
  // }, [props.classroom]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesQuery]);

  if (messagesQuery.isPending) {
    return <LoadingPage />;
  }

  if (messagesQuery.isError) {
    console.log(messagesQuery.error);
    return <ErrorWithPage />;
  }

  // useEffect(() => {
  //   if (props.receivedMessage !== null && props.receivedMessage.teacherStudent == false && props.receivedMessage.senderId !== props.currentUser._id) {
  //     setMessages([...messages, props.receivedMessage])
  //   }
  // },[props.receivedMessage])

  // const handleSend = async () => {
  //   const content = inputRef.current?.value as string;
  //   console.log("content", content);
  //   if (inputRef && inputRef.current) {
  //     inputRef.current.value = "";
  //   }
  //   const message: Message = {
  //     senderId: props.currentUser._id,
  //     text: content,
  //     classroomId: props.classroom.id,
  //     teacherStudent: false,
  //     role: props.currentUser.isTeacher ? "teacher" : "student",
  //   };
  //   setMessages((prev) => [...prev, message]);
  //   // send message to socket server
  //   // props.handleSetSocketMessage(message)
  //   // send message to database
  //   try {
  //     toast.loading("generating response");
  //     const data = await addAiMessage(message);
  //     toast.dismiss();
  //     setMessages((prev) => [...prev, data]);
  //     // props.handleSetSocketMessage(data)
  //   } catch {
  //     console.log("error receiving AI Message");
  //     toast.error("could not generate response");
  //   }
  // };


  const handleTtsClick = () =>{
    if (ttsOn) {
      setTtsOn(false);
    } else {
      setTtsOn(true)
    }
  };
    

  const handleSend = async () => {
    const content = inputRef.current?.value as string;
    console.log("content", content);
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const message: Message = {
      senderId: props.currentUser._id,
      text: content,
      classroomId: props.classroom.id,
      teacherStudent: false,
      role:
        props.currentUser.id === props.classroom.teacherId
          ? "teacher"
          : "student",
    };
    // send message to socket server
    // props.handleSetSocketMessage(message)
    // send message to database
    messageMutation.mutateAsync(message, {
      onSettled: async () => {
        return await queryClient.invalidateQueries({ queryKey: ["messages"] });
      },
      onSuccess(data) {
        queryClient.setQueryData(["messages", data.id], data);
        console.log(data);
        // props.handleSetSocketMessage(data)
        if (ttsOn) {
        audioMutation.mutateAsync(data.text, {
          onSuccess(data) {
            let url = window.URL.createObjectURL(data);
            setAudio(url);
          },
        })
      };
      },
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend(); // Call handleSend when Enter is pressed
    }
  };

  return (
    <>
      <Box
        className="ai-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "calc(100% - 42px)",
          width: "100%",
        }}
      >
        {/* chat-body */}
        <Box
          className="ai-chat-body"
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            flex: "1 1 auto",
            minHeight: "0px",
            padding: "5px 0 20px 0",
          }}
        >
          {messagesQuery.data?.map((message, index) => (
            <>
              <Box ref={scroll} paddingTop={"20px"}>
                {message.senderId === props.currentUser._id}
                <ChatItem
                  content={message.text}
                  role={message.role}
                  key={index}
                  currentUser={
                    message.senderId === props.currentUser._id
                      ? props.currentUser
                      : props.otherUser
                  }
                  // currentUser={props.currentUser}
                />
              </Box>
            </>
          ))}
          {messageMutation.isPending && (
            <>
              <Box paddingTop={"20px"}>
                {messageMutation.variables.senderId === props.currentUser._id}
                <ChatItem
                  content={messageMutation.variables.text}
                  role={messageMutation.variables.role}
                  currentUser={props.currentUser}
                />
              </Box>
              <Box ref={scroll} paddingTop={"20px"}>
                {messageMutation.variables.senderId === props.currentUser._id}
                <ChatItemLoading />
              </Box>
            </>
          )}
        </Box>
        {/* chat-sender */}
        <Box
          className="ai-chat-sender"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <TextToSpeech audio={audio} handleClick = {handleTtsClick} isOn = {ttsOn} audioPending={audioMutation.isPending}/>
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="outlined"
            type="text"
            onKeyDown={handleKeyDown}
            sx={{ pl: "10px", pr: "10px" }}
            InputProps={{
              sx: { borderRadius: "50px", bgcolor: "white", height: "40px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSend}
                    color="secondary"
                    size="small"
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default AiChat;
