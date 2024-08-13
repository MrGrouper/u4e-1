import { NextFunction, Request, Response } from "express";
import Classroom from "../models/Classroom.js";
import { openai } from "../config/openai-config.js";
import * as fs from "fs";
import Subject from "../models/Subject.js";
import {Types} from "mongoose";

export const createClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {subjectId, studentId, teacherId} = req.body
  const subject = await Subject.findById(subjectId)
  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: `You are teaching ${subject.name} please use the curriculum that matches ${subject.vectorStoreFileId} ${subject.additionalInstructions}`,
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
    subject.classrooms = subject.classrooms.concat(result._id)
    await subject.save()
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const studentClassrooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const classroom = await Classroom.find({
      studentId: userId
    }).populate("subjectId")
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const teacherClassrooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const classroom = await Classroom.find({
      teacherId: userId
    }).populate("subjectId");
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const findClassroomById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params
  try {
    const classroom = await Classroom.findById(id)
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json(error);
  }
};
