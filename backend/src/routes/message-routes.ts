import {Router} from 'express';
import { addMessage, generateChatCompletion, sendInitialChatRequest, getAIMessages, getTSMessages } from '../controllers/message-controller.js';
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";


const messageRouter = Router()

messageRouter.post('/', verifyToken, addMessage);
messageRouter.post(
    '/new', 
    validate(chatCompletionValidator),
    verifyToken, 
    generateChatCompletion
    );
messageRouter.post(
    '/initialize', 
    // validate(chatCompletionValidator),
    verifyToken, 
    sendInitialChatRequest
    );

messageRouter.get('/ai/:classroomId', verifyToken, getAIMessages);
messageRouter.get('/ts/:classroomId', verifyToken, getTSMessages);

export default messageRouter