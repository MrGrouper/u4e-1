import { Types } from 'mongoose';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupStudent,
  signupTeacher,
  updateUser
} from "../helpers/api-communicator";

type User = {
  _id: Types.ObjectId,
  firstname: string;
  lastname: string;
  email: string;
  isAdmin: boolean;
  isTeacher: boolean;
  subjects: Array<string>;
  avatarUrl: string
};
type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  studentSignup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  teacherSignup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  userUpdate: (user:User) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ _id: data._id, email: data.email, firstname: data.firstname, lastname: data.lastname , isAdmin: data.isAdmin, isTeacher: data.isTeacher, subjects:data.subjects, avatarUrl: data.avatarUrl});
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ _id: data._id, email: data.email, firstname: data.firstname, lastname: data.lastname , isAdmin: data.isAdmin, isTeacher: data.isTeacher, subjects:data.subjects, avatarUrl: data.avatarUrl})
      setIsLoggedIn(true);
    }
  };
  const studentSignup = async (firstname: string, lastname: string, email: string, password: string) => {
    const data = await signupStudent(firstname, lastname, email, password);
    if (data) {
      setUser({ _id: data._id, email: data.email, firstname: data.firstname, lastname: data.lastname , isAdmin: data.isAdmin, isTeacher: data.isTeacher, subjects:data.subjects, avatarUrl: data.avatarUrl})
      setIsLoggedIn(true);
    }

  };
  const teacherSignup = async (firstname: string, lastname: string, email: string, password: string) => {
    const data = await signupTeacher(firstname, lastname, email, password);
    if (data) {
      setUser({ _id: data._id, email: data.email, firstname: data.firstname, lastname: data.lastname , isAdmin: data.isAdmin, isTeacher: data.isTeacher, subjects:data.subjects, avatarUrl: data.avatarUrl})
      setIsLoggedIn(true);
    }
  };
  const userUpdate = async (user: User) => {
    const data = await updateUser(user);
    if (data) {
      setUser({ _id: data._id, email: data.email, firstname: data.firstname, lastname: data.lastname , isAdmin: data.isAdmin, isTeacher: data.isTeacher, subjects:data.subjects, avatarUrl: data.avatarUrl})
      setIsLoggedIn(true);
    }

  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    studentSignup,
    teacherSignup,
    userUpdate
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);