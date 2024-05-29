import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    },
    curriculum: {
        type: String,
        required: true
    },
    videos: {
        type: Array
    },
}, { timestamps: true });
subjectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
export default mongoose.model("Subject", subjectSchema);
//# sourceMappingURL=Subject.js.map