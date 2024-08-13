import { useEffect, useRef } from "react";
import { getTSMessages, addMessage } from "../../helpers/api-communicator";
// import { Types } from "mongoose";
import { IoMdSend } from "react-icons/io";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CustomAvatar from "../shared/CustomAvatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../shared/LoadingPage";
import ErrorWithPage from "../shared/ErrorWithPage";
import TeacherChatItem from "./TeacherChatItem";

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

const TeacherChat = (props: {
  classroom: Classroom;
  currentUser: any;
  otherUser: any;
  // handleSetSocketMessage,
  // receivedMessage
}) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  // const [userData, setUserData] = useState<User | null>(null);
  // const [messages, setMessages] = useState<Message[]>([]);

  const scroll = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const messagesQuery = useQuery({
    queryKey: ["tsmessages", props.classroom.id],
    queryFn: () => getTSMessages(props.classroom.id),
  });

  const messageMutation = useMutation({
    mutationFn: addMessage,
  });

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesQuery.data]);

  if (messagesQuery.isPending) {
    return <LoadingPage />;
  }

  if (messagesQuery.isError) {
    console.log(messagesQuery.error);
    return <ErrorWithPage />;
  }

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
    messageMutation.mutate(message, {
      onSettled: async () => {
        return await queryClient.invalidateQueries({
          queryKey: ["tsmessages"],
        });
      },
      onSuccess(data) {
        queryClient.setQueryData(["tsmessages", data.id], data);
        console.log(data);
      },
    });
  };

  // fetch messages
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const data = await getTSMessages(props.classroom.id);
  //       setMessages(data.filter((message) => message.teacherStudent));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (props.classroom !== null) fetchMessages();
  // }, [props.classroom]);

  // useEffect(() => {
  //   if (props.receivedMessage !== null && props.receivedMessage.teacherStudent == true) {
  //     setMessages([...messages, props.receivedMessage])
  //   }
  // },[props.receivedMessage])

  // const handleSend = async () => {
  //   const content = inputRef.current?.value as string;
  //   if (inputRef && inputRef.current) {
  //     inputRef.current.value = "";
  //   }
  //   const message: Message = {
  //     senderId: props.currentUser._id,
  //     text: content,
  //     classroomId: props.classroom.id,
  //     teacherStudent: true,
  //     role: props.currentUser.isTeacher ? "teacher" : "student",
  //   };
  //   // send message to socket
  //   // console.log("Sending message to socket:", message);
  //   // props.handleSetSocketMessage(message)

  //   // send message to database
  //   try {
  //     const data = await addMessage(message);
  //     setMessages([...messages, data]);
  //   } catch {
  //     console.log("error");
  //   }
  // };

  return (
    <>
      <Box
        className="ChatBox-container"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          width: "100%",
          alignContent: "space-between",
          borderRadius: "10px",
          bgcolor: "primary.light",
          [theme.breakpoints.up("sm")]: {
            maxWidth: "500px",
          },
        }}
      >
        <Box
          bgcolor="secondary.main"
          sx={{
            padding: "10px 24px 10px 24px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "20px",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <CustomAvatar
            firstName={props.otherUser.firstname}
            lastName={props.otherUser.lastname}
            avatarUrl={props.otherUser.avatarUrl}
            size={40}
          />
          <Typography variant="body1">
            {props.otherUser.firstname} {props.otherUser.lastname}
          </Typography>
        </Box>
        <Box
          className="chat-body"
          sx={{
            backgroundColor: "transparent",
            display: "flex",
            flex: "1",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "1.5rem",
            overflowY: "auto",
          }}
        >
          {messagesQuery.data?.map((message, index) => (
            <TeacherChatItem
              message={message}
              currentUser={props.currentUser}
              otherUser={props.otherUser}
              scroll={scroll}
              key={index}
              />
          ))}
          {messageMutation.isPending && 
          <TeacherChatItem
          message={messageMutation.variables}
          currentUser={props.currentUser}
          otherUser={props.otherUser}
          scroll={scroll}
          />}
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
              sx: { borderRadius: "50px", bgcolor: "white", height: "40px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSend}
                    sx={{ color: "black", mx: 1 }}
                  >
                    <IoMdSend />
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

export default TeacherChat;
