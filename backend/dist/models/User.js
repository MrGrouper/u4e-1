import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    //user roles: teacher, student, admin to add later
    isAdmin: {
        type: Boolean,
        required: true,
    },
    isTeacher: {
        type: Boolean,
        required: true,
    },
    subjects: {
        type: Array,
    },
}, { timestamps: true });
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map