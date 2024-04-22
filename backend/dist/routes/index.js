import { Router } from "express";
import userRoutes from "./user-routes.js";
// import chatRoutes from "./chat-routes.js";
import classroomRoutes from "./classroom-routes.js";
import messageRoutes from "./message-routes.js";
const appRouter = Router();
appRouter.use("/user", userRoutes); //domain/api/v1/user
// appRouter.use("/chat", chatRoutes); //domain/api/v1/chats
appRouter.use("/classroom", classroomRoutes);
appRouter.use("/message", messageRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map