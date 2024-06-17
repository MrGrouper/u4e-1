import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

axios.defaults.baseURL = "/api/v1";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient()

const labelFontSize = ".75em";
const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: '#3c4043',
      light: '#DCDCDC'
    },
    secondary: {
      main: '#118ab2'
    },
    error: {
      main: '#ef476f'
    },
    warning: {
      main:"#ffd166"
    },
    info: {
      main:"#073b4c"
    },
    success: {
      main:"#06d6a0"
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: labelFontSize
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& > fieldset > legend": {
            fontSize: `calc(0.75 * ${labelFontSize})`
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster 
          position="bottom-center" 
    />
          <App />
          <ReactQueryDevtools />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
