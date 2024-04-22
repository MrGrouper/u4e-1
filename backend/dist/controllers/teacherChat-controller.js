import TeacherChat from "../models/TeacherChat.js";
export const addMessage = async (req, res) => {
    const { classroomId, senderId, text } = req.body;
    const message = new TeacherChat({
        classroomId,
        senderId,
        text,
    });
    try {
        const result = await message.save();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const getMessages = async (req, res) => {
    const { classroomId } = req.params;
    try {
        const result = await TeacherChat.find({ classroomId });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
//# sourceMappingURL=teacherChat-controller.js.map