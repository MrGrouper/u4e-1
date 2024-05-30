import {Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
// import { chatCompletionValidator, validate } from "../utils/validators.js";
import { createSubject, findSubject, subjectUpdate } from '../controllers/subject-controller.js';

const subjectRoutes = Router()

subjectRoutes.post('/new', verifyToken, createSubject);
subjectRoutes.get('/:subjectId', verifyToken, findSubject )
subjectRoutes.put("/:id/update", verifyToken, subjectUpdate)

export default subjectRoutes