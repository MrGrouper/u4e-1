import { Router } from "express";
import { getAllUsers, teacherSignup, userLogin, userLogout, userUpdate, studentSignup, verifyUser, getUser, } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate, } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/studentsignup", validate(signupValidator), studentSignup);
userRoutes.post("/teachersignup", validate(signupValidator), teacherSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.put("/:id/update", verifyToken, userUpdate);
userRoutes.get("/:id", verifyToken, getUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map