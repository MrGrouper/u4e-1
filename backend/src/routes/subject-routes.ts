import {Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
// import { chatCompletionValidator, validate } from "../utils/validators.js";
import { createSubject } from '../controllers/subject-controller.js';

const subjectRoutes = Router()

subjectRoutes.post('/new', verifyToken, createSubject);

export default subjectRoutes