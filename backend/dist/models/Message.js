import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    classroomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    teacherStudent: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true });
messageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
export default mongoose.model("Message", messageSchema);
//# sourceMappingURL=Message.js.map