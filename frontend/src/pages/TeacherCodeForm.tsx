import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { IoIosLogIn } from "react-icons/io";
import Logo from "../components/shared/Logo";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  onValidCode: () => void;
};

const TeacherCodeForm = ({ onValidCode }: Props) => {
  const auth = useAuth()
  const navigate = useNavigate()

  const [code, setCode] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user.isTeacher) {
      return navigate("/portal")
    }
    else if (auth?.isLoggedIn && !auth.user.isTeacher) {
      setCurrentUser(auth.user);
    }
  }, [auth]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const VALID_TEACHER_CODE = "U4ETeacher"; // Replace with the actual code

    if (code !== VALID_TEACHER_CODE) {
      toast.error("Invalid Teacher Code");
      return;
    }

    if(currentUser){
      try{
        const newUserInfo = {
          ...currentUser,
          isTeacher: true
        };
        console.log(newUserInfo);
        await auth?.userUpdate(newUserInfo);
        toast.success("You can now begin teaching!", { id: "Teacher Granted" });
        navigate("/portal")
      }
     catch (error) {
        console.log(error);
        toast.error('Could not grant teacher privileges', { id: "Teacher Granted" });
      }

    }

    else onValidCode();
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
            Enter Your Access Code
          </Typography>
          <TextField
            fullWidth
            label="Teacher Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            margin="normal"
            InputProps={{
              style: {
                borderRadius: 10,
                color: "primary",
              },
            }}
          />
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
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TeacherCodeForm;
