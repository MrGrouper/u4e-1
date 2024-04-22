import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
// import { chatCompletionValidator, validate } from "../utils/validators.js";
import { createClassroom, findClassroom, userClassrooms } from '../controllers/classroom-controller.js';
const classroomRoutes = Router();
classroomRoutes.post('/', verifyToken, createClassroom);
classroomRoutes.get('/:userId', verifyToken, userClassrooms);
classroomRoutes.get('/find/:firstId/:secondId', verifyToken, findClassroom);
export default classroomRoutes;
//# sourceMappingURL=classroom-routes.js.map