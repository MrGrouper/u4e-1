import { Router } from 'express';
import { addMessage, getMessages } from '../controllers/teacherChat-controller.js';
import { verifyToken } from "../utils/token-manager.js";
const teacherChatRouter = Router();
teacherChatRouter.post('/', verifyToken, addMessage);
teacherChatRouter.get('/:classroomId', verifyToken, getMessages);
export default teacherChatRouter;
//# sourceMappingURL=teacherChat-routes.js.map