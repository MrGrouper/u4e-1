import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { createServer } from "http";
import { Server } from "socket.io";
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});
io.on("connection", (socket) => {
    socket.on("clientMessage", (data) => {
        console.log(data);
        socket.join(data.classroomId);
        io.to(data.classroomId).emit("serverMessage", data);
    });
});
server.listen(8080);
const PORT = process.env.PORT || 4000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log('Server Open & Connected to Database'));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map