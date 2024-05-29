import Classroom from "../models/Classroom.js";
import { openai } from "../config/openai-config.js";
export const createClassroom = async (req, res) => {
    const thread = await openai.beta.threads.create({
        messages: [
            {
                role: 'user',
                content: `Use the curriculum available at the following link to teach the student:`
            }
        ]
    });
    const newClassroom = new Classroom({
        members: [req.body.senderId, req.body.receiverId],
        subject: req.body.subject,
        threadId: thread.id,
        messages: []
    });
    try {
        const result = await newClassroom.save();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const userClassrooms = async (req, res) => {
    try {
        const classroom = await Classroom.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(classroom);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const findClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(classroom);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
//# sourceMappingURL=classroom-controller.js.map