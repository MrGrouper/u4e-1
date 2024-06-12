import express from "express";
import { config } from "dotenv";
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
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self' https://u4e-zjbtlzdxca-uc.a.run.app/favicon.ico https://storage.googleapis.com/u4e/ https://fonts.googleapis.com/; img-src 'self' https://storage.googleapis.com/u4e/ https://u4e-zjbtlzdxca-uc.a.run.app/favicon.ico; style-src 'self' 'unsafe-inline'");
//   next();
// });
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
// app.use(morgan("dev"));
app.use("/api/v1", appRouter);
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});
export default app;
//# sourceMappingURL=app.js.map