import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { toast } from 'react-hot-toast';

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
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
      mt={'64px'}
    >
      <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
        Enter Teacher Code
      </Typography>
      <form onSubmit={handleSubmit} style={{ 
            width: '100%', 
            maxWidth: '400px',             
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",}}>
        <TextField
          fullWidth
          label="Teacher Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: {
              width: "400px",
              borderRadius: 10,
              fontSize: 12,
              color: "white",
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          sx={{
            px: 2,
            py: 1,
            mt: 2,
            borderRadius: 2,
            bgcolor: "#00fffc",
            ":hover": {
              bgcolor: "white",
              color: "black",
            },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default TeacherCodeForm;
