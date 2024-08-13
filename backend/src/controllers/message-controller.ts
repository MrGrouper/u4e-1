import Message from "../models/Message.js";
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { openai } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import Classroom from "../models/Classroom.js";
import { runAiAssistant } from "../utils/aihelper.js";

type Message = {
  classroomId: string;
  senderId: string;
  text: string;
  teacherStudent: boolean;
  role: string;
  createdAt?: string;
};

export const assistantId = process.env.OPENAI_ASSISTANT_ID;

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { classroomId, senderId, text, teacherStudent, role } = req.body;
  const classroom = await Classroom.findById(classroomId);
  console.log("classroom", classroom);
  const message = new Message({
    classroomId: classroom._id,
    senderId,
    text,
    teacherStudent,
    role,
  });
  console.log(message);
  try {
    const savedMessage = await message.save();
    classroom.messages = classroom.messages.concat(savedMessage._id);
    await classroom.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { classroomId, senderId, text, teacherStudent, role } = req.body;
  const classroom = await Classroom.findById(classroomId).populate("messages");
  const message = new Message({
    classroomId: classroomId,
    senderId,
    text,
    teacherStudent,
    role,
  });

  try {
    const savedMessage = await message.save();
    //@ts-expect-error populate doesnt change type
    classroom.messages = classroom.messages.concat(savedMessage);
    await classroom.save();
    const lastMessageForRun = await runAiAssistant(classroom.threadId, message.text, "user")
    if (lastMessageForRun) {
      const chatResponseMessage = new Message({
        classroomId: classroomId,
        senderId: 'AI',
           //@ts-expect-error text does exist on object
        text: lastMessageForRun.content[0].text.value,
        teacherStudent,
        role: lastMessageForRun.role
      });
    

      const savedChatResponseMessage = await chatResponseMessage.save()
      //@ts-expect-error populate doesnt change type
      classroom.messages = classroom.messages.concat(savedChatResponseMessage);
      await classroom.save();
      res.status(200).json(savedChatResponseMessage)
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const sendInitialChatRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subject, threadId, id, studentId, teacherId } = req.body;

  const classroom = await Classroom.findById(id).populate("messages");
  const student = await User.findById(studentId)
  const content = `Teacher: You are teaching ${subject}. Your student is named ${student.firstname}. Please use the pdf document that is related to ${subject} that was provided to you. Begin by greeting the student and ask them if they are ready to begin.`
  try {
   const lastMessageForRun = await runAiAssistant (threadId, content, "user" )
   if (lastMessageForRun) {
    const chatResponseMessage = new Message({
      classroomId: id,
      senderId: 'AI',
      //@ts-expect-error text does exist on object
      text: lastMessageForRun.content[0].text.value,
      teacherStudent: false,
      role: lastMessageForRun.role
    });
    
    const initialTeacherMessage = new Message({
      classroomId: id,
      senderId: teacherId,
      text: `Hey ${student.firstname}! Its your instructor here. You can ask me any questions you have in this chatbox`,
      teacherStudent: true,
      role: "teacher"
    })
    const savedChatResponseMessage = await chatResponseMessage.save()
    await initialTeacherMessage.save()
    //@ts-expect-error populate doesnt change type
    classroom.messages = classroom.messages.concat(savedChatResponseMessage, initialTeacherMessage);
    await classroom.save();
    res.status(200).json(lastMessageForRun)
  }
}
 catch (error) {
  res.status(500).json(error);
  console.log(error);
}
};

export const sendUpdateClassroomMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { classroomId, subjectName,vectorStoreFileId, additionalInstructions } = req.body;

  const classroom = await Classroom.findById(classroomId).populate("messages");
  console.log(classroom)

  const content = `This is the teacher. I've updated your course info. You are teaching ${subjectName}. Please use the pdf document matching ${vectorStoreFileId} that was provided to you as your curriculum. Continue teaching the topics where you left off previously. But use this new curriculum from now onwards. ${additionalInstructions}Respond to this message with "Your human teacher has updated the course information. Are you ready to continue?"`
  try{
  const lastMessageForRun = await runAiAssistant (classroom.threadId, content, "user" )
  if (lastMessageForRun) {
   const chatResponseMessage = new Message({
     classroomId: classroomId,
     senderId: 'AI',
     //@ts-expect-error text does exist on object
     text: lastMessageForRun.content[0].text.value,
     teacherStudent: false,
     role: lastMessageForRun.role
   });

   const savedChatResponseMessage = await chatResponseMessage.save()
    //@ts-expect-error populate doesnt change type
   classroom.messages = classroom.messages.concat(savedChatResponseMessage);
   await classroom.save();
   res.status(200).json(lastMessageForRun)
  }
}
  catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}


export const getAIMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { classroomId } = req.params;
  try {
    const result = await Message.find({ classroomId, teacherStudent: false });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTSMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { classroomId } = req.params;
  try {
    const result = await Message.find({ classroomId, teacherStudent: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const ttsMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text } = req.body
  console.log("text", text)
  const mp3 = await openai.audio.speech.create({
    model:"tts-1",
    voice:"alloy",
    input: text
  })
  const buffer = Buffer.from(await mp3.arrayBuffer());
  res.send(buffer)
}

// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message } = req.body;
//   try {
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "User not registered OR Token malfunctioned" });
//     // grab chats of user
//     const chats = user.classrooms.aiChats.map(({ role, content }) => ({
//       role,
//       content,
//     })) as ChatCompletionRequestMessage[];
//     chats.push({ content: message, role: "user" });
//     user.classrooms.aiChats.push({ content: message, role: "user" });
//     console.log(chats)

//     // send all chats with new one to openAI API
//     const config = configureOpenAI();
//     const openai = new OpenAIApi(config);
//     // get latest response
//     const chatResponse = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: chats,
//     });
//     console.log("chats", chats)
//     user.classrooms.aiChats.push(chatResponse.data.choices[0].message);
//     console.log("user.classrooms.aiChats", user.classrooms.aiChats)
//     await user.save();
//     return res.status(200).json({ chats: user.classrooms.aiChats });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };
