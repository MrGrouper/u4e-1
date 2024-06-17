import {Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
// import { chatCompletionValidator, validate } from "../utils/validators.js";
import { createSubject, findAllSubjects, findSubject, findSubjectWithClassrooms, subjectUpdate } from '../controllers/subject-controller.js';

const subjectRoutes = Router()

subjectRoutes.post('/new', verifyToken, createSubject);
subjectRoutes.get('/:id', findSubject )
subjectRoutes.get('/classrooms/:id', findSubjectWithClassrooms ),
subjectRoutes.get('/', findAllSubjects )
subjectRoutes.put("/:id/update", verifyToken, subjectUpdate)

export default subjectRoutes