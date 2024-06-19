import {Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
// import { chatCompletionValidator, validate } from "../utils/validators.js";
import { createClassroom, findClassroomById, studentClassrooms, teacherClassrooms } from '../controllers/classroom-controller.js';

const classroomRoutes = Router()

classroomRoutes.post('/', verifyToken, createClassroom);
classroomRoutes.get('/student/:userId',verifyToken, studentClassrooms);
classroomRoutes.get('/teacher/:userId',verifyToken, teacherClassrooms);
classroomRoutes.get('/findbyid/:id', verifyToken, findClassroomById);

export default classroomRoutes