import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {
  uploadCurriculum,
  sendCreateSubject,
} from "../../helpers/api-communicator";
// import { updateUser } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import CustomizedInput from "../shared/CustomizedInput";

const CreateSubject = () => {
  const auth = useAuth();

  const [curriculum, setCurriculum] = useState<any>(null);

  // const [currentUser, setCurrentUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (curriculum) {
      const data = new FormData(e.currentTarget);
      const subjectName = data.get("subjectname") as string;
      data.append("curriculum", curriculum);
      try {
        const curriculumUrl = await uploadCurriculum(data);
        // const newUserInfo = {...currentUser, avatarUrl: imageUrl}
        // const updatedUser = await updateUser(newUserInfo)
        // setCurrentUser(updatedUser)
        await sendCreateSubject({
          name: subjectName,
          teacherId: auth.user._id,
          curriculum: curriculumUrl,
        });
        toast.success("Course created!");
      } catch (error) {
        console.log(error);
        toast.error("Could not create course");
      }
    } else {
      toast.error("Please select an file");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCurriculum(e.target.files[0]);
  };

  return (
    //   <Box
    //     display={"flex"}
    //     flex={{ xs: 1, md: 0.5 }}
    //     justifyContent={"center"}
    //     alignItems={"center"}
    //     padding={2}
    //     ml={"auto"}
    //     mt={16}
    //   >
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        margin: "auto",
        padding: "30px",
        boxShadow: "10px 10px 20px #000",
        borderRadius: "10px",
        border: "none",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingBottom={"15px"}
      >
        <Typography>Add Curriculum</Typography>
      </Box>

      <CustomizedInput type="text" name="subjectname" label="Subject name" />

      <input
        type="file"
        accept=".pdf, .doc, .docx"
        multiple={false}
        onChange={handleChange}
      />

      <Button
        type="submit"
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          width: "400px",
          borderRadius: 2,
          bgcolor: "#e8e4e6",
          color: "#001e1d",
          ":hover": {
            bgcolor: "white",
            color: "black",
          },
        }}
      >
        Create Class
      </Button>
    </form>
    //   </Box>
  );
};

export default CreateSubject;
