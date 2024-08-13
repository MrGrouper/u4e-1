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
  isLoading: boolean; 
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginPending: boolean,
  loginError: boolean,
  studentSignup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  studentSignupPending: boolean,
  studentSignupError: boolean,
  teacherSignup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
  teacherSignupPending: boolean,
  teacherSignupError: boolean,
  userUpdate: (user: User) => Promise<void>;
  userUpdatePending: boolean,
  userUpdateError: boolean,
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

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
      setIsLoading(false);
    }
    checkStatus();
  }, [queryClient]);

  const loginMutation = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
        const data = await loginUser(params.email.toLowerCase(), params.password);
        if (data) {
            setIsLoggedIn(true);
            queryClient.setQueryData(['user'], data);
            setIsLoading(false); // Ensure isLoading is set to false after login
        }
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['user']});
    },
});

  const studentSignupMutation = useMutation({
    mutationFn: async (params: { firstname: string; lastname: string; email: string; password: string }) => {
      const data = await signupStudent(params.firstname, params.lastname, params.email.toLowerCase(), params.password);
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
        setIsLoading(false); 
      }
  },
  onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
  },
  });

  const teacherSignupMutation = useMutation({
    mutationFn: async (params: { firstname: string; lastname: string; email: string; password: string }) => {
      const data = await signupTeacher(params.firstname, params.lastname, params.email.toLowerCase(), params.password);
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
        setIsLoading(false); 
      }
  },
  onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
  },
  });

  const userUpdateMutation = useMutation({
    mutationFn: async (user: User) => {
      const data = await updateUser(user);
      if (data) {
        setIsLoggedIn(true);
        queryClient.setQueryData(['user'], data);
        setIsLoading(false); 
      }
  },
  onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
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
    isLoading,
    login: (email: string, password: string) => loginMutation.mutateAsync({ email, password }),
    loginPending: loginMutation.isPending,
    loginError: loginMutation.isError,
    studentSignup: (firstname: string, lastname: string, email: string, password: string) => studentSignupMutation.mutateAsync({ firstname, lastname, email, password }),
    studentSignupPending: studentSignupMutation.isPending,
    studentSignupError: studentSignupMutation.isError,
    teacherSignup: (firstname: string, lastname: string, email: string, password: string) => teacherSignupMutation.mutateAsync({ firstname, lastname, email, password }),
    teacherSignupPending: teacherSignupMutation.isPending,
    teacherSignupError: teacherSignupMutation.isError,
    userUpdate: (user: User) => userUpdateMutation.mutateAsync(user),
    userUpdatePending: userUpdateMutation.isPending,
    userUpdateError: userUpdateMutation.isError,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
