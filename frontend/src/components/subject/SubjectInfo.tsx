import { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { updateSubject } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { Types } from "mongoose";
import EditableInput from "../shared/EditableInput";

type Subject = {
  name: string,
  teacherId: Types.ObjectId | string,
  curriculum: string,
  vectorStoreFileId: string, 
  courseDescription: string,
  imageUrl: string,
  videos:string[], 
  classrooms: Types.ObjectId[]
}

const SubjectInfo = (props: { subject: Subject }) => {
  const auth = useAuth();

  const [currentSubject, setCurrentSubject] = useState(null);
  const[courseName, setCourseName] = useState("")
  const[courseDescription, setCourseDescription] = useState("")

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentSubject(props.subject);
      setCourseName(props.subject.name)
      setCourseDescription(props.subject.courseDescription)
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subjectName = data.get("subjectname") as string;
    const courseDescription = data.get("courseDescription") as string;
    try {
      const newSubjectInfo = { ...currentSubject, name: subjectName, courseDescription:courseDescription };
      await updateSubject(newSubjectInfo);
      toast.success("course updated!");
    } catch (error) {
      console.log(error);
      toast.error("Could not update course info");
    }
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
      boxShadow: "10px 10px 20px #000",
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
    <Typography variant="h4">Update Course Info</Typography>
    </Box>
    <EditableInput type="text" name="subjectname" label="Course Name" value={courseName} rows = {1} onChange={(e) => setCourseName(e.target.value)}/>

    <EditableInput type="text" name="subjectDesciption" label="Course Description" value={courseDescription} rows = {5} onChange={(e) => setCourseName(e.target.value)}/>

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
  );
};

export default SubjectInfo;