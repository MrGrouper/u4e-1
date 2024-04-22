import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"
import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from"cors"
import { Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "../../typing.js"

const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, { 
  cors: {
    origin: ["https://ardent-particle-382720.uc.r.appspot.com"]
  }
});

io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  socket.on("clientMessage", (data) => {
    console.log(data)
    socket.join(data.classroomId)
    io.to(data.classroomId).emit("serverMessage", data)
  })
});

server.listen(80);


const PORT = process.env.PORT || 4000
connectToDatabase()
  .then(()=>{
    app.listen(PORT,() =>console.log('Server Open & Connected to Database'))
  })
  .catch((err) => console.log(err))