import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";
import { changeUserPassword } from "../helpers/api-communicator";

const ChangePassword = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match", {
        id: "passwordMismatch",
      });
      return;
    }

    try {
      await changeUserPassword(auth?.user?._id.toString(), currentPassword, newPassword);
      toast.success("Password changed successfully", { id: "passwordChangeSuccess" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Password change failed", { id: "passwordChangeError" });
    }
  };

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width="100%"
      height="100vh"
    >
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "auto",
          padding: "30px",
          border: "none",
          width: "90%",
          maxWidth: "400px",
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
            Change Password
          </Typography>
          <CustomizedInput type="password" name="currentPassword" label="Current Password" />
          <CustomizedInput type="password" name="newPassword" label="New Password" />
          <CustomizedInput type="password" name="confirmPassword" label="Confirm New Password" />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={auth?.loginPending ? null : <IoIosLogIn />}
            disabled={auth?.loginPending ? true : false}
          >
            {auth?.loginPending ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Change Password"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePassword;
