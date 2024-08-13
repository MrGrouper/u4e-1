import axios from "axios";
import { Types } from 'mongoose';

type Message = {
  classroomId: string,
  senderId: string,
  text: string,
  teacherStudent:boolean,
  role: string,
}

type Subject = {
  name: string,
  teacherId: Types.ObjectId | string,
  curriculum: string,
  vectorStoreFileId: string, 
  courseDescription: string,
  imageUrl: string,
  videos:string[]
  classrooms: Types.ObjectId[] | string[]
}

type User = {
  _id: Types.ObjectId,
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  isTeacher: boolean;
  subjects: Array<string>;
  avatarUrl: string
};


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
  password: string,
) => {
  const res = await axios.post("/user/studentsignup", { firstname, lastname, email, password});
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

export const sendInitialChatRequest = async (req:{classroom: object, senderId: any}) => {
  const reqUpdated = {...req.classroom, studentId: req.senderId}
  const res = await axios.post("/message/initialize", reqUpdated )
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

export const getAIMessages = async (classroomId: string | Types.ObjectId | undefined ) => {
  const res = await axios.get(`/message/ai/${classroomId}`);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getTSMessages = async (classroomId: string | Types.ObjectId | undefined ) => {
  const res = await axios.get(`/message/ts/${classroomId}`);
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const addMessage = async (message: Message) => {
  const res = await axios.post('/message/', message );
  if (res.status !== 200) {
    throw new Error("Unable to send message");
  }

  const data = await res.data;
  return data;
};

export const addAiMessage = async (message: Message) => {
  const res = await axios.post('/message/new', message );
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


export const getStudentClassrooms = async ( userId: string | Types.ObjectId | undefined) => {

const res = await axios.get(`/classroom/student/${userId}`);
if (res.status !== 200) {
  throw new Error("Unable to get classrooms");
}

const data = await res.data;

return data;
};

export const getTeacherClassrooms = async ( userId: string | Types.ObjectId | undefined) => {

  const res = await axios.get(`/classroom/teacher/${userId}`);
  if (res.status !== 200) {
    throw new Error("Unable to get classrooms");
  }
  
  const data = await res.data;
  
  return data;
  };

export const getClassroomById = async ( id: string | Types.ObjectId | undefined) => {

  const res = await axios.get(`/classroom/findbyid/${id}`);
  if (res.status !== 200) {
    throw new Error("Unable to get classroom");
  }
  
  const data = await res.data;
  
  return data;
  };

export const uploadImage = async (formData: FormData) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const res = await axios.post('/upload/image', formData, config );
  if (res.status !== 200) {
    throw new Error("Unable to upload image");
  }

  const data = await res.data;
  return data;
};

export const uploadCurriculum = async (formData: FormData) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const res = await axios.post('/upload/curriculum', formData, config );
  if (res.status !== 200) {
    throw new Error("Unable to upload file");
  }

  const data = await res.data;
  return data;
};

export const uploadNewSubject = async (formData: FormData) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const res = await axios.post('/upload/new-subject', formData, config );
  if (res.status !== 200) {
    throw new Error("Unable to upload files");
  }

  const data = await res.data;
  return data;
};


export const updateUser = async ( user: User ) => {
  const res = await axios.put(`/user/${user._id}/update`, user );
  if (res.status !== 200) {
    throw new Error("Unable to update user");
  }

  const data = await res.data;
  return data;
};

export const changeUserPassword = async (
  userId: string | Types.ObjectId,
  currentPassword: string,
  newPassword: string
) => {
  const res = await axios.post(`/user/${userId}/changePassword`, {
    currentPassword,
    newPassword,
  });
  if (res.status !== 200) {
    throw new Error("Unable to change password");
  }
  const data = await res.data;
  return data;
};

export const sendCreateSubject = async (subject: Subject) => {
  const res = await axios.post("/subject/new", subject);
  if (res.status !== 200) {
    throw new Error("Unable to create subject");
  }
  const data = await res.data;
  return data;
};

export const getSubject = async ( id: string | Types.ObjectId | undefined) => {

  const res = await axios.get(`/subject/${id}`);
  if (res.status !== 200) {
    throw new Error("Unable to get subject");
  }
  
  const data = await res.data;
  
  return data;
  };

  export const getSubjectWithClassrooms = async ( id: string | Types.ObjectId | undefined) => {

    const res = await axios.get(`/subject/classrooms/${id}`);
    if (res.status !== 200) {
      throw new Error("Unable to get subject");
    }
    
    const data = await res.data;
    
    return data;
    };

  export const getAllSubjects = async () => {

    const res = await axios.get(`/subject`);
    if (res.status !== 200) {
      throw new Error("Unable to get subject");
    }
    
    const data = await res.data;
    
    return data;
    };

  export const updateSubject = async (subject) => {
    const res = await axios.put(`/subject/${subject.id}/update`, subject );
    if (res.status !== 200) {
      throw new Error("Unable to update subject");
    }
  
    const data = await res.data;
    return data;
  };

  export const sendUpdateChatRequest = async (req:{classroomId: Types.ObjectId | string, subjectName: string, vectorStoreFileId: string, additionalInstructions: string}) => {

    const res = await axios.post("/message/update", req )
    if (res.status !== 200){
      throw new Error("Unable to send classroom update message");
    }
    const data = await res.data;
    return data;
  }

  export const ttsRequest = async (text) => {
    console.log(text)
    const res = await axios.post("/message/tts", {text:text}, {responseType:"blob"})
    if (res.status !== 200){
      throw new Error("Unable to send tts audio message");
    }
    const data = await res.data
    return data
  }