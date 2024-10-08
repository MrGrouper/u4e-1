import axios from "axios";
import { Types } from 'mongoose';

type Message = {
  classroomId: string,
  senderId: string,
  text: string,
  teacherStudent:boolean,
  role: string,
}



export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupStudent = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/studentsignup", { firstname, lastname, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const signupTeacher = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/teachersignup", { firstname, lastname, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};


export const sendCreateClassroomRequest = async (req: object) => {
  const res = await axios.post("/classroom/", req);
  if (res.status !== 200) {
    throw new Error("Unable to create classroom");
  }
  const data = await res.data;
  return data;
};

export const sendInitialChatRequest = async (classroom: object, senderId: any) => {
  console.log("apicom", classroom,senderId )
  const req = {...classroom, senderId: senderId}
  console.log("req", req)
  const res = await axios.post("/message/initialize", req )
  if (res.status !== 200){
    throw new Error("Unable to create classroom");
  }
  const data = await res.data;
  return data;
}



export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

// export const sendInitialChatRequest = async (message: string) => {
//   const res = await axios.post("/chat/initialize", { message });
//   if (res.status !== 200) {
//     throw new Error("Unable to send initial chat");
//   }
//   const data = await res.data;
//   return data;
// };

export const getMessages = async (classroomId: string | Types.ObjectId | undefined ) => {
  const res = await axios.get(`/message/${classroomId}`);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const addMessage = async (message: Message) => {
  const res = await axios.post('/message/', message );
  // console.log(res)
  if (res.status !== 200) {
    throw new Error("Unable to send message");
  }

  const data = await res.data;
  return data;
};

export const addAiMessage = async (message: Message) => {
  const res = await axios.post('/message/new', message );
  // console.log(res)
  if (res.status !== 200) {
    throw new Error("Unable to send message");
  }

  const data = await res.data;
  return data;
};

// export const deleteUserChats = async () => {
//   const res = await axios.delete("/chat/delete");
//   if (res.status !== 200) {
//     throw new Error("Unable to delete chats");
//   }
//   const data = await res.data;
//   return data;
// };

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};

export const getUser = async ( id: string | Types.ObjectId | undefined ) => {
  const res = await axios.get(`/user/${id}`);
  if (res.status !== 200) {
    throw new Error("Unable to get user");
  }
  const data = await res.data;

  return data;
};

export const getAllUsers = async () => {
  const res = await axios.get(`/user`);
  if (res.status !== 200) {
    throw new Error("Unable to get users");
  }
  const data = await res.data;

  return data;
};


export const getUserClassrooms = async ( id: string | Types.ObjectId | undefined) => {

const res = await axios.get(`/classroom/${id}`);
if (res.status !== 200) {
  throw new Error("Unable to get classrooms");
}

const data = await res.data;

return data;
};
