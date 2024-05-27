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
  palette: {
    primary: {
      main: '#e8e4e6',
      light: '#fffffe;',
      dark: '#004643',
      contrastText: '#001e1d'
    },
    secondary: {
      main: '#abd1c6',
      light: '#fffffe;',
      contrastText: '#f9bc60'
    }
  }
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
