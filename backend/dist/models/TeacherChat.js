import mongoose from "mongoose";
const teacherChatSchema = new mongoose.Schema({
    classroomId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
}, { timestamps: true });
export default mongoose.model("TeacherChat", teacherChatSchema);
//# sourceMappingURL=TeacherChat.js.map