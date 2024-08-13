import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id
  try {
    //get all users
    const user = await User.findById(id);
    if (user) {
      res.status(200)      
      .json({ message: "OK", _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, isTeacher: user.isTeacher, isAdmin: user.isAdmin, avatarUrl: user.avatarUrl });
    } else {
      res.status(404).json("No such User");
    }
    console.log(user)
  } catch (error) {
    res.status(500).json(error);
  }

};

export const studentSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { firstname, lastname, email, password, avatarUrl } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({ firstname, lastname, email: email.toLowerCase(), password: hashedPassword, isTeacher: false, isAdmin: false, avatarUrl });
    await user.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: false,
      secure: true,
      // domain: "u4e-zjbtlzdxca-uc.a.run.app",
      domain: 'localhost',
      // domain: 'u4education.com',
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
<<<<<<< HEAD
      // domain: "u4e-zjbtlzdxca-uc.a.run.app",
      domain: 'localhost',
      // domain: 'u4education.com',
      expires,
      httpOnly: false,
      secure: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "OK", _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, isTeacher: user.isTeacher, isAdmin: user.isAdmin, createdAt: user.createdAt, subjects: user.subjects, updatedAt: user.updatedAt, avatarUrl:user.avatarUrl });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const teacherSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { firstname, lastname, email, password, subjects, avatarUrl } = req.body;
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({ firstname, lastname, email: email.toLowerCase(), password: hashedPassword, isTeacher: true, isAdmin: false, subjects, avatarUrl });
    await user.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: false,
      secure: true,
      // domain: "u4e-zjbtlzdxca-uc.a.run.app",
      domain: 'localhost',
      // domain: 'u4education.com',
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      // domain: "u4e-zjbtlzdxca-uc.a.run.app",
      domain: 'localhost',
      // domain: 'u4education.com',
=======
      domain: "u4e.onrender.com",
>>>>>>> parent of 142c3b5 (working locally models slightly updated.)
      expires,
      httpOnly: false,
      secure: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "OK", _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, isAdmin: user.isAdmin, isTeacher: user.isTeacher, subjects: user.subjects, avatarUrl: user.avatarUrl});
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    // create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      httpOnly: false,
      secure: true,
      // domain: "u4e-zjbtlzdxca-uc.a.run.app",
      domain: 'localhost',
      // domain: 'u4education.com',
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      // domain: "u4e-zjbtlzdxca-uc.a.run.app",
      domain: 'localhost',
      // domain: 'u4education.com',
      expires,
      httpOnly: false,
      secure: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, isAdmin: user.isAdmin, isTeacher: user.isTeacher, subjects: user.subjects, avatarUrl: user.avatarUrl });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({  message: "OK", _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, isAdmin: user.isAdmin, isTeacher: user.isTeacher, subjects: user.subjects, avatarUrl: user.avatarUrl});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    
    const isPasswordCorrect = await compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect current password");
    }

    const hashedNewPassword = await hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      // domain: 'u4education.com',
      expires,
      httpOnly: false,
      secure: true,
      signed: true,
    });

    return res.status(200).json({
      message: "Password updated successfully",
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndUpdate(res.locals.jwtData.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    console.log(user)

    return res
      .status(200)
      .json({  message: "OK", _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, isAdmin: user.isAdmin, isTeacher: user.isTeacher, subjects: user.subjects, avatarUrl: user.avatarUrl});
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};


export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: false,
      secure: true,
      // domain: "u4e-zjbtlzdxca-uc.a.run.app",
      domain: 'localhost',
      // domain: 'u4education.com',
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, isTeacher: user.isTeacher, isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};