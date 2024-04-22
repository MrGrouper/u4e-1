import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = "/api/v1";
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Reddit Mono,monospace"
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster 
          position="bottom-center" 
          // toastOptions={{
          //   duration: 5000
          // }}
    />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
