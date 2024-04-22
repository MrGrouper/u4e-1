import {Router} from 'express';
import { addMessage, getMessages, generateChatCompletion, sendInitialChatRequest } from '../controllers/message-controller.js';
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

messageRouter.get('/:classroomId', verifyToken, getMessages);

export default messageRouter