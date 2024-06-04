//@ts-expect-error unused
import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";



const UserInfo = () => {
    const auth = useAuth();

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
        } catch (error) {
          console.log(error);
          toast.error("Signing Up Failed", { id: "signup" });
        }
      };
  return (
    <form
    onSubmit={handleSubmit}
    style={{
      margin: "auto",
      padding: "30px",
      boxShadow: "10px 10px 20px #000",
      borderRadius: "10px",
      border: "none",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        padding={2}
        fontWeight={600}
      >
        Edit User Info
      </Typography>
      <CustomizedInput type="text" name="firstname" label="First name" />
      <CustomizedInput type="text" name="lastname" label="Last name" />
      <CustomizedInput type="email" name="email" label="Email" />
      <CustomizedInput type="password" name="password" label="Password" />
      <Button
        type="submit"
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          width: "400px",
          borderRadius: 2,
          bgcolor: "#00fffc",
          ":hover": {
            bgcolor: "white",
            color: "black",
          },
        }}
        endIcon={<IoIosLogIn />}
      >
        Save Edits
      </Button>
    </Box>
  </form>
  )
}

export default UserInfo