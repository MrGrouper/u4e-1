import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { IoIosLogIn } from "react-icons/io";
import Logo from "../components/shared/Logo";

type Props = {
  onValidCode: () => void;
};

const TeacherCodeForm = ({ onValidCode }: Props) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const VALID_TEACHER_CODE = "U4ETeacherx7dy"; // Replace with the actual code

    if (code !== VALID_TEACHER_CODE) {
      toast.error("Invalid Teacher Code");
      return;
    }

    onValidCode();
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
