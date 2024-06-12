import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user) {
      return navigate("/login");
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
      toast.loading("Signing Up", { id: "signup" });
      await auth?.studentSignup(firstname, lastname, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
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
      mt={{ xs: 4, sm: 8 }} // Responsive margin-top
      width="100%" // Ensure full width for mobile responsiveness
      height="100vh" // Full height for centering vertically
    >
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
          borderRadius: "10px",
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
          <Box display={"flex"} justifyContent={"center"}>
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
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              borderRadius: 2,
            }}
            endIcon={<IoIosLogIn />}
          >
            Signup
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
