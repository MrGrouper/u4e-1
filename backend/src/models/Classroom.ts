import mongoose from "mongoose";



const classroomSchema = new mongoose.Schema({

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    studentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    teacherId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    threadId: {
        type: String,
        required: true
    },
    messages: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
]

},
{ timestamps: true },
)

classroomSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

export default mongoose.model("Classroom", classroomSchema)