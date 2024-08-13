import { Router } from "express";
import { imageUpload, curriculumUpload, createSubjectUpload } from '../controllers/file-controller.js';
import { verifyToken } from "../utils/token-manager.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadRoutes = Router();
uploadRoutes.post('/image', verifyToken, upload.single('image'), imageUpload);
uploadRoutes.post('/curriculum', verifyToken, upload.single('curriculum'), curriculumUpload);
uploadRoutes.post('/new-subject', verifyToken, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'curriculum', maxCount: 1 }
]), createSubjectUpload);
export default uploadRoutes;
//# sourceMappingURL=upload-routes.js.map