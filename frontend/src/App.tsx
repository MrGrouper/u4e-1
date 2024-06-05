import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Classroom from "./pages/Classroom";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Onboard from "./pages/Onboard";
import AccountSettings from "./pages/AccountSettings";
import AddSubject from "./pages/AddSubject";
import TeacherSignup from "./pages/TeacherSignup";
import SubjectOnboard from "./pages/SubjectOnboard";
import Portal from "./pages/Portal";
import AboutCourse from "./pages/AboutCourse";
import TeacherCodeForm from "./pages/TeacherCodeForm";
import SubjectUpdate from "./pages/SubjectUpdate";
import UserDrawer from "./components/drawer/UserDrawer";
import { Box } from "@mui/material";
import { Socket, io }from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from "../../typing"

// const socket: Socket<ServerToClientEvents, ClientToServerEvents > = io("https://ardent-particle-382720.uc.r.appspot.com:80");

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000", {
  transports: ["websocket", "polling"], // Ensure the correct transport methods
  reconnectionAttempts: 5, // Try to reconnect 5 times
});

socket.on("connect", () => {
  console.log(`Connected to server with socket ID: ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

function App() {
  const auth = useAuth();
  const location = useLocation();
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [socketMessage, setSocketMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null);

    // Send Message to socket server
    useEffect(() => {
      if (socketMessage!==null) {
        console.log("Sending message:", socketMessage);
        socket.emit("clientMessage", socketMessage );
      }
    }, [socketMessage]);
  
    // Get the message from socket server
    useEffect(() => {
      socket.on("serverMessage", (data) => {
        console.log("Received message:", data);
        handleSetReceivedMessage(data);
      }
      );
    }, []);

    const handleSetSocketMessage = (data) => {
      setSocketMessage(data)
    }
  
    const handleSetReceivedMessage = (data) =>
      setReceivedMessage(data)
  

  const handleValidCode = () => {
    setIsCodeValid(true);
  };

  // List of paths where the header should be displayed
  const headerPaths = ["/", "/login", "/signup", "/teachersignup", "/course/:id"];

  // Check if the current path matches any of the header paths
  const showHeader = headerPaths.some(path => 
    new RegExp(`^${path.replace(/:[^\s/]+/g, '([^/]+)')}$`).test(location.pathname)
  );

  return (
    <main style={{ display: 'flex' }}>
      {showHeader ? (
        <Header />
      ) : (
        <UserDrawer auth={auth}/>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3,
      backgroundColor: 'var(--background)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/teachersignup"
            element={
              isCodeValid ? <TeacherSignup /> : <TeacherCodeForm onValidCode={handleValidCode} />
            }
          />
          <Route path="/course/:id" element={<AboutCourse />} />
          {auth?.isLoggedIn && auth.user && (
            <Route path="/account-settings" element={<AccountSettings />} />
          )}
          {auth?.isLoggedIn && auth.user && (
            <Route path="/onboard" element={<Onboard />} />
          )}
          {auth?.isLoggedIn && auth.user.isTeacher === true && (
            <Route path="/addsubject" element={<AddSubject />} />
          )}
          {auth?.isLoggedIn && auth.user.isTeacher === false && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          {auth?.isLoggedIn && auth.user.isTeacher === true && (
            <Route path="/portal" element={<Portal />} />
          )}
          {auth?.isLoggedIn && auth.user && (
            <Route
              path="/classroom/:id"
              element={
                <Classroom
                handleSetSocketMessage = {handleSetSocketMessage}
                receivedMessage = {receivedMessage}
                />
              }
            />
          )}
          {auth?.isLoggedIn && auth.user && (
            <Route path="/:id/onboard" element={<SubjectOnboard />} />
          )}
          {auth?.isLoggedIn && auth.user && (
            <Route path="/:id/update" element={<SubjectUpdate />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </main>
  );
}

export default App;
