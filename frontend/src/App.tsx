import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Classroom from "./pages/Classroom";
import NotFound from "./pages/NotFound";
// import { useAuth } from "./context/AuthContext";
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
import UserHeader from "./components/header/UserHeader";
import CourseCatalog from "./pages/CourseCatalog";
import PrivateRoutes from "./components/route-helpers/PrivateRoutes";
import TeacherRoutes from "./components/route-helpers/TeacherRoutes";
import About from "./pages/About";
import Contribute from "./pages/Contribute";
import ChangePassword from "./pages/ChangePassword";

// import { Socket, io } from 'socket.io-client';

// const socket: Socket<ServerToClientEvents, ClientToServerEvents > = io("https://ardent-particle-382720.uc.r.appspot.com:4000", {
//   transports: ["websocket", "polling"], // Ensure the correct transport methods
//   reconnectionAttempts: 5, // Try to reconnect 5 times
// });

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000", {
//   transports: ["websocket", "polling"], // Ensure the correct transport methods
//   reconnectionAttempts: 5, // Try to reconnect 5 times
// });

// socket.on("connect", () => {
//   console.log(`Connected to server with socket ID: ${socket.id}`);
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected from server");
// });

function App() {
  // const auth = useAuth();
  const location = useLocation();
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  // const [socketMessage, setSocketMessage] = useState(null);
  // const [receivedMessage, setReceivedMessage] = useState(null);

  // Send Message to socket server
  // useEffect(() => {
  //   if (socketMessage !== null) {
  //     console.log("Sending message:", socketMessage);
  //     socket.emit("clientMessage", socketMessage);
  //   }
  // }, [socketMessage]);

  // Get the message from socket server
  // useEffect(() => {
  //   socket.on("serverMessage", (data) => {
  //     console.log("Received message:", data);
  //     handleSetReceivedMessage(data);
  //   });
  // }, []);

  // const handleSetSocketMessage = (data) => {
  //   setSocketMessage(data);
  // };

  // const handleSetReceivedMessage = (data) => {
  //   setReceivedMessage(data);
  // };

  const handleValidCode = () => {
    setIsCodeValid(true);
  };

  // List of paths where the header should be displayed
  const headerPaths = ["/", "/login", "/signup", "/teachersignup", "/onboard", "/course/:id", "/catalog", "/about", "/contribute"];




  // Check if the current path matches any of the header paths
  const showHeader = headerPaths.some(path =>
    new RegExp(`^${path.replace(/:[^\s/]+/g, '([^/]+)')}$`).test(location.pathname)
  ) 

  const isNotFoundPath = location.pathname === "*";

  const handleDrawerToggle = (isOpen) => {
    setDrawerOpen(isOpen);
  };

  return (
    <>
      { (showHeader || isNotFoundPath) ? (
        <Header />
      ) : (
        <UserHeader handleDrawerToggle={handleDrawerToggle} />
      )}
      <Box
        component="main"
        sx={{
          display:"flex",
          mt: "65px",
          height:"calc(100vh - 65px)",
          width: showHeader ? "100vw" : {
            md: drawerOpen ? "calc(100vw - 240px)" : "100vw"
          },
          padding: "0px",
          marginLeft: showHeader ? "0px" : { md: drawerOpen ? '240px' : '0px' }, // Adjust main content based on drawer state
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contribute" element={<Contribute/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/teachersignup"
            element={
              isCodeValid ? <TeacherSignup /> : <TeacherCodeForm onValidCode={handleValidCode} />
            }
          />
          <Route path="/catalog" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<AboutCourse />} />
          {/* {auth?.isLoggedIn && auth.user && (
            <> */}
            <Route element={<PrivateRoutes />}>
              <Route path="/account-settings" element={<AccountSettings />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/onboard" element={<Onboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/classroom/:id" element={<Classroom />} />
              <Route path="/:id/onboard" element={<SubjectOnboard />} />
              <Route path="/:id/update" element={<SubjectUpdate />} />
              <Route element={<TeacherRoutes />}>
              <Route path="/addsubject" element={<AddSubject />} />
              <Route path="/portal" element={<Portal />} />
              </Route>
              </Route>
            {/* </>
          )} */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
