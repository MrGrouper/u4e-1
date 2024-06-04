import Subject from "../models/Subject.js";
import User from "../models/User.js";
export const createSubject = async (req, res, next) => {
    const { name, teacherId, curriculum, vectorStoreFileId, courseDescription, imageUrl, videos } = req.body;
    const teacher = await User.findById(teacherId);
    console.log(teacher);
    const newSubject = new Subject({
        name,
        courseDescription,
        teacherId,
        curriculum,
        vectorStoreFileId,
        imageUrl,
        videos
    });
    try {
        const result = await newSubject.save();
        console.log(result._id);
        teacher.subjects = teacher.subjects.concat(result._id);
        console.log(teacher);
        await teacher.save();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const findSubject = async (req, res, next) => {
    const { id } = req.params;
    console.log('id', req);
    try {
        const subject = await Subject.findById(id);
        console.log('subject', subject);
        if (subject) {
            res.status(200).json(subject);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const findAllSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const subjectUpdate = async (req, res, next) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.body.id, req.body, {
            new: true,
        });
        if (!subject) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (subject.teacherId.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        console.log(subject);
        return res
            .status(200)
            .json(subject);
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=subject-controller.js.map