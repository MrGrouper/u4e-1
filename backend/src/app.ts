import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//middlewares

const cor = app.use(cors<Request>());
console.log(cor, 'cor')
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


//remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>{
    console.log(res)
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
}
)



export default app;