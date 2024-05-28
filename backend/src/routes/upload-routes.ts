import { Router } from "express";
import {
    imageUpload
} from '../controllers/file-controller.js'
import { verifyToken } from "../utils/token-manager.js";
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({storage: storage})


const uploadRoutes = Router()

uploadRoutes.post('/image' ,upload.single('image'), imageUpload)

export default uploadRoutes