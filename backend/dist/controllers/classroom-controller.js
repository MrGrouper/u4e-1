import Classroom from "../models/Classroom.js";
import { openai } from "../config/openai-config.js";
import Subject from "../models/Subject.js";
export const createClassroom = async (req, res, next) => {
    const { subjectId, studentId, teacherId } = req.body;
    console.log('req.body', req.body);
    const subject = await Subject.findById(subjectId);
    console.log('subject log', subject);
    const thread = await openai.beta.threads.create({
        messages: [
            {
                role: "user",
                content: `You are teaching ${subject.name} please use the curriculum that matches ${subject.vectorStoreFileId}`,
            },
        ],
    });
    const newClassroom = new Classroom({
        studentId: studentId,
        teacherId: teacherId,
        subjectId: subjectId,
        threadId: thread.id,
        messages: [],
    });
    try {
        const result = await newClassroom.save();
        subject.classrooms = subject.classrooms.concat(result._id);
        await subject.save();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const studentClassrooms = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const classroom = await Classroom.find({
            studentId: userId
        }).populate("subjectId");
        res.status(200).json(classroom);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const teacherClassrooms = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const classroom = await Classroom.find({
            teacherId: userId
        }).populate("subjectId");
        res.status(200).json(classroom);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const findClassroomById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const classroom = await Classroom.findById(id);
        res.status(200).json(classroom);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
//# sourceMappingURL=classroom-controller.js.map