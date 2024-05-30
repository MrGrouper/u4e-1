import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    curriculum: {
        type: String,
        required: true
    },
    vectorStoreFileId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
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