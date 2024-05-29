import Subject from "../models/Subject.js"


export const createSubject = async (req, res) => {
  const newSubject = new Subject({
    name: req.body.name,
    teacherId: req.body.teacherId,
    curriculum: req.body.curriculum,
  });
  try {
    const result = await newSubject.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};