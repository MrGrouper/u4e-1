import mongoose from "mongoose";
const classroomSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    members: {
        type: Array,
    },
    threadId: {
        type: String
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
}, { timestamps: true });
classroomSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
export default mongoose.model("Classroom", classroomSchema);
//# sourceMappingURL=Classroom.js.map