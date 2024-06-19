import { Types } from 'mongoose';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  avatarUrl: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  studentSignup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  teacherSignup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  userUpdate: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: user } = useQuery({
    queryKey:['user'], 
    queryFn: checkAuthStatus, 
    enabled: false
  });

  useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
      }
    }
    checkStatus();
  }, [queryClient]);

  const login = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const data = await loginUser(params.email, params.password);
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
      }
    },
  });

  const studentSignup = useMutation({
    mutationFn: async (params: { firstname: string; lastname: string; email: string; password: string }) => {
      const data = await signupStudent(params.firstname, params.lastname, params.email, params.password);
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
      }
    },
  });

  const teacherSignup = useMutation({
    mutationFn: async (params: { firstname: string; lastname: string; email: string; password: string }) => {
      const data = await signupTeacher(params.firstname, params.lastname, params.email, params.password);
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
      }
    },
  });

  const userUpdate = useMutation({
    mutationFn: async (user: User) => {
      const data = await updateUser(user);
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
      }
    },
  });

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    queryClient.removeQueries({queryKey: ['user']});
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login: (email: string, password: string) => login.mutateAsync({ email, password }),
    studentSignup: (firstname: string, lastname: string, email: string, password: string) => studentSignup.mutateAsync({ firstname, lastname, email, password }),
    teacherSignup: (firstname: string, lastname: string, email: string, password: string) => teacherSignup.mutateAsync({ firstname, lastname, email, password }),
    userUpdate: (user: User) => userUpdate.mutateAsync(user),
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
