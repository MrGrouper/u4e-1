import  { useEffect, useState } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Classroom from "./pages/Classroom";
// import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
// import Footer from "./components/footer/Footer";
import { Socket, io }from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from "../../typing"

const socket: Socket<ServerToClientEvents, ClientToServerEvents > = io("https://ardent-particle-382720.uc.r.appspot.com:80");

socket.on("connect", () => {
  console.log(`client ${socket.id}`)
})


function App() {
  const auth = useAuth();

  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null);



  // Connect to Socket.io
  // useEffect(() => {
  //   socket.current= io("ws://localhost:8800");
  //   socket.current.emit("new-user-add", user?._id);
  //   socket.current.on("get-users", (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (socketMessage!==null) {
      socket.emit("clientMessage", socketMessage );
    }
  }, [socketMessage]);

  const handleSetSocketMessage = (data) => {
    setSocketMessage(data)
  }

  const handleSetReceivedMessage = (data) =>
    setReceivedMessage(data)



  // Get the message from socket server
  useEffect(() => {
    socket.on("serverMessage", (data) => {
      handleSetReceivedMessage(data);
    }
    );
  }, []);

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )} */}
        {auth?.isLoggedIn && auth.user && (
          <Route path="/dashboard" element={<Dashboard 

            />} />
        )}
          {auth?.isLoggedIn && auth.user && (
          <Route path="/classroom/:id" element={<Classroom 
            handleSetSocketMessage = {handleSetSocketMessage}
            receivedMessage = {receivedMessage}
            />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;