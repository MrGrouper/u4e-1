import { useEffect, useState, useRef } from "react";
import { getMessages } from "../../helpers/api-communicator";
import { getUser, addMessage } from "../../helpers/api-communicator";
// import { format } from "timeago.js";
// import InputEmoji from "react-input-emoji";
import { Types } from "mongoose";
import { IoMdSend } from "react-icons/io";
import { IconButton } from "@mui/material";

type Classroom = {
  id: string;
  members: string[];
  subject: string;
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

const TeacherChat = (props: { classroom: Classroom; currentUser: any; handleSetSocketMessage: any; receivedMessage: any}) => {
  //@ts-expect-error unused
  const [userData, setUserData] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[] | []>([]);

  const scroll = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const handleChange = (newMessage: string) => {
  //   setNewMessage(newMessage);
  // };
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
        setMessages(data.filter((message) => message.teacherStudent == true));
      } catch (error) {
        console.log(error);
      }
    };

    if (props.classroom !== null) fetchMessages();
  }, [props.classroom]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (props.receivedMessage !== null && props.receivedMessage.teacherStudent == true) {
      setMessages([...messages, props.receivedMessage])
    }
  },[props.receivedMessage])

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
    props.handleSetSocketMessage(message)


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
      <div className="ChatBox-container" style={{height:"100%"}}>
        <>
          {/* chat-body */}
          <div className="chat-body">
            {messages?.map((message) => (
              <>
                <div
                  ref={scroll}
                  className={
                    message.senderId === props.currentUser._id
                      ? "message own"
                      : "message"
                  }
                >
                  <span>{message.text}</span>
                  {/* <span>{format(message.createdAt)}</span> */}
                </div>
              </>
            ))}
          </div>
          {/* chat-sender */}
          <div
          className="chat-sender"
          >
            {" "}
            <input
              ref={inputRef}
              type="text"
            />
            <IconButton onClick={handleSend} sx={{ color: "black", mx: 1 }}>
              <IoMdSend />
            </IconButton>
          </div>
        </>
      </div>
    </>
  );
};

export default TeacherChat;
