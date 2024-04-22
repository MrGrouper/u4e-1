// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";


// export const initializeChats = async (
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
//     chats.push({ content: message, role: "system" });
//     user.classrooms.aiChats.push({ content: message, role: "system" });
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


// export const generateChatCompletion = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { message, classroom } = req.body;
//   try {
//     const message = await User.findById(res.locals.jwtData.id);
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

// export const sendChatsToUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     //user token check
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }
//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }
//     console.log(user.classrooms.aiChats)
//     return res.status(200).json({ message: "OK", chats: user.classrooms.aiChats });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };

// export const deleteChats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     //user token check
//     const user = await User.findById(res.locals.jwtData.id);
//     if (!user) {
//       return res.status(401).send("User not registered OR Token malfunctioned");
//     }
//     if (user._id.toString() !== res.locals.jwtData.id) {
//       return res.status(401).send("Permissions didn't match");
//     }
//     //@ts-ignore
//     user.classrooms.aiChats = [];
//     await user.save();
//     return res.status(200).json({ message: "OK" });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({ message: "ERROR", cause: error.message });
//   }
// };