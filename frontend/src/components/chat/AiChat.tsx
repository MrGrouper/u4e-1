import { useEffect, useState, useRef } from "react";
import { getMessages, getUser, addAiMessage } from "../../helpers/api-communicator";
import ChatItem from "./ChatItem";
// import InputEmoji from "react-input-emoji";
import { IconButton } from "@mui/material";
import { IoMdSend } from "react-icons/io";
// import { format } from "timeago.js";
import { Types } from "mongoose";
import { toast } from "react-hot-toast";


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
//@ts-expect-error unused
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
    <div className="ai-container" >
        {/* chat-body */}
        <div className="ai-chat-body">
          {messages?.map((message, index) => (
            <>
              <div ref={scroll}>
                <ChatItem content={message.text} role={message.role} key={index} />
                {/* <span>{format(message.createdAt)}</span> */}
              </div>
            </>
          ))}
        </div>
        {/* chat-sender */}
        <div 
          className="ai-chat-sender">
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSend} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
    </div>
  </>
  );
};



export default AiChat;
