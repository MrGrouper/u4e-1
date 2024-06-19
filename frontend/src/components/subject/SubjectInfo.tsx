import { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
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
  const theme = useTheme();

  const [currentSubject, setCurrentSubject] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentSubject(props.subject);
      setCourseName(props.subject.name);
      setCourseDescription(props.subject.courseDescription);
    }
  }, [auth, props.subject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subjectName = data.get("subjectname") as string;
    const courseDescription = data.get("courseDescription") as string;
    try {
      const newSubjectInfo = { ...currentSubject, name: subjectName, courseDescription };
      await updateSubject(newSubjectInfo);
      toast.success("Course updated!");
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
        flexDirection: "column",
        margin: "auto",
        padding: "30px",
        boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
        borderRadius: "10px",
        maxWidth: "400px",
        width: "100%",
        [theme.breakpoints.up('sm')]: {
          maxWidth: "400px",
        },
      }}
    >
      <Box
        sx={{
          alignContent: "center",
          paddingBottom: '15px'
        }}
      >
        <Typography variant="h5">Update Course Info</Typography>
      </Box>
      <EditableInput
        type="text"
        name="subjectname"
        label="Course Name"
        value={courseName}
        rows={1}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <EditableInput
        type="text"
        name="courseDescription"
        label="Course Description"
        value={courseDescription}
        rows={5}
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          width: "100%",
          borderRadius: 2,
        }}
      >
        Update Course
      </Button>
    </form>
  );
};

export default SubjectInfo;
