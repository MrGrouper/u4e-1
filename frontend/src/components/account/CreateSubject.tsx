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
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const CreateSubject = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [curriculum, setCurriculum] = useState<any>(null);


  // const [currentUser, setCurrentUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subjectName = data.get("subjectname") as string;
    const courseDescription = data.get("courseDescription") as string;
    console.log('coursedesc', courseDescription)
    if (curriculum) {
      data.append("curriculum", curriculum);
      try {
        const uploadCurriculumRes = await uploadCurriculum(data);
        const newSubject = await sendCreateSubject({
          name: subjectName,
          teacherId: auth.user._id,
          curriculum: uploadCurriculumRes.curriculumUrl,
          vectorStoreFileId: uploadCurriculumRes.vectorStoreFileId,
          courseDescription: courseDescription,
          imageUrl: null,
          videos: null,
          classrooms: null
        });
        console.log(newSubject)
        toast.success("Course created!");
        navigate(`/${newSubject.id}/onboard`, {state: newSubject})
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
        
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        margin: "auto",
        padding: "30px",
        boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
        borderRadius: "10px",
        border: "none",
      }}
    >
      <Box
      sx={{
        alignContent: "center",
        paddingBottom: '15px'
      
      }}
      >
      <Typography variant="h4">Add New Course</Typography>
      </Box>
      <CustomizedInput type="text" name="subjectname" label="Course Name" />

      <TextField
      margin="normal"
      name="courseDescription"
      label="Course Description"
      type="text"
      multiline
      rows={5}
      InputProps={{
        style: {
          borderRadius: 10,
          color: "primary",
        },
      }}
    />
    <Box
    sx={{
      mt: '8px',
      border: '1px solid white',
      borderRadius: '10px',
      padding: "16px"

    }}>
    <Typography variant="h5">Add Curriculum File</Typography>
      <input
        type="file"
        accept=".pdf, .doc, .docx"
        multiple={false}
        onChange={handleChange}
      />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        Create Course
      </Button>
    </form>

  );
};

export default CreateSubject;
