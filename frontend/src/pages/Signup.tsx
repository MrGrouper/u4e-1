import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, CircularProgress, Link } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user && auth.isLoggedIn && auth.user.isTeacher) {
      return navigate("/portal");
    }
    if (auth?.user && auth.isLoggedIn && !auth.user.isTeacher) {
      return navigate("/dashboard");
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await auth?.studentSignup(firstname, lastname, email, password);
      navigate("/onboard");
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  return (
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
            textAlign="center"
            padding={2}
            fontWeight={400}
          >
            Sign Up
          </Typography>
          <CustomizedInput type="text" name="firstname" label="First name" />
          <CustomizedInput type="text" name="lastname" label="Last name" />
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={auth?.studentSignupPending ? null : <IoIosLogIn />}
            disabled = {auth?.studentSignupPending ? true : false}
          >
            {auth?.studentSignupPending ? 
            <CircularProgress size={24} color="secondary"/> : "Signup" }
          </Button>
          <Typography pt="10px" alignSelf= "center "variant="caption" sx={{ textDecoration: "none" }}>
            <Link
              color="secondary.light"
              sx={{ wordBreak: "break-word" }}
              onClick={() => navigate("/login")}
              underline="hover"
              noWrap
            >
              Already a user?
            </Link>
          </Typography>

        </Box>
      </form>
    </Box>
  );
};

export default Signup;
