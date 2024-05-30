import { NextFunction, Request, Response } from "express";
import Classroom from "../models/Classroom.js"
import { openai } from "../config/openai-config.js";
import * as fs from 'fs';
import Subject from "../models/Subject.js";



export const createClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const subject = await Subject.findById(req.body.subject)
  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: 'user',
        content: `You are teaching ${subject.name} please use the curriculum that matches ${subject.vectorStoreFileId}`
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
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userClassrooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroom = await Classroom.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classroom = await Classroom.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(classroom)
  } catch (error) {
    res.status(500).json(error)
  }
};

