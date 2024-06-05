import React, { useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import EditableInput from "../shared/EditableInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


const UserInfo = () => {
  const auth = useAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentUser(auth.user);
      setFirstname(auth.user.firstname);
      setLastname(auth.user.lastname);
      setEmail(auth.user.email);
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.loading("Updating user info", { id: "updateUserInfo" });
      const newUserInfo = {
        ...currentUser,
        firstname,
        lastname,
        email
      };
      console.log(newUserInfo);
      const updatedUser = await auth?.userUpdate(newUserInfo);
      setCurrentUser(updatedUser);
      toast.success('User info updated!', { id: "updateUserInfo" });
    } catch (error) {
      console.log(error);
      toast.error('Could not update user info', { id: "updateUserInfo" });
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
        <EditableInput
          type="text"
          name="firstname"
          label="First name"
          value={firstname}
          rows={1}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <EditableInput
          type="text"
          name="lastname"
          label="Last name"
          value={lastname}
          rows={1}
          onChange={(e) => setLastname(e.target.value)}
        />
        <EditableInput
          type="email"
          name="email"
          label="Email"
          value={email}
          rows={1}
          onChange={(e) => setEmail(e.target.value)}
        />

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
  );
};

export default UserInfo;
