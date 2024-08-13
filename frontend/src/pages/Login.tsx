import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, Link, CircularProgress } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await auth?.login(email, password);
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user && auth.isLoggedIn && auth.user.isTeacher) {
      return navigate("/portal");
    }
    if (auth?.user && auth.isLoggedIn && !auth.user.isTeacher) {
      return navigate("/dashboard");
    }
  }, [auth]);

  return (
    // <Box width={"100%"} height={"100%"} display="flex" justifyContent={"center"}
    // alignItems={"center"}>

    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%" // Ensure full width for mobile responsiveness
      height="100vh" // Full height for centering vertically
    >
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          // boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
          // borderRadius: "10px",
          border: "none",
          width: "90%", // Adjust width for mobile responsiveness
          maxWidth: "400px", // Maximum width for larger screens
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box display={"flex"} justifyContent={"center"} alignSelf={"center"}>
            <Logo />
          </Box>
          <Typography
            variant="h5"
            color="primary"
            textAlign="center"
            padding={2}
            fontWeight={400}
          >
            Log In
          </Typography>
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={auth?.loginPending ? null :  <IoIosLogIn />}
              disabled = {auth?.loginPending ? true : false}
            >
              {auth?.loginPending ? 
            <CircularProgress size={24} color="secondary"/> : "Log In"  
            }
            </Button>
          
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          paddingTop={"10px"}
          gap={"10px"}
          flexWrap={"wrap"}
        >
          <Typography variant="caption" sx={{ textDecoration: "none" }}>
            <Link
              color="secondary.light"
              sx={{ wordBreak: "break-word" }}
              onClick={() => navigate("/forgotpassword")}
              underline="hover"
              noWrap
            >
              Forgot Password?
            </Link>
          </Typography>
          <Box display={"flex"} flexWrap={"nowrap"} justifyContent={"flex-end"}>
            <Typography
              variant="caption"
              noWrap
              sx={{ wordBreak: "break-word" }}
            >
              Dont have an account?&nbsp;
            </Typography>
            <Typography
              variant="caption"
              sx={{ textDecoration: "none" }}
              color="secondary"
            >
              <Link
                color="secondary.light"
                onClick={() => navigate("/signup")}
                underline="hover"
                noWrap
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
