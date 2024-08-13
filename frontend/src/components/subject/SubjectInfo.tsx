import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { sendUpdateChatRequest, updateSubject } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { Types } from "mongoose";
import EditableInput from "../shared/EditableInput";
import { useMutation } from "@tanstack/react-query";

type Subject = {
  name: string;
  teacherId: Types.ObjectId | string;
  curriculum: string;
  vectorStoreFileId: string;
  courseDescription: string;
  imageUrl: string;
  videos: string[];
  classrooms: Types.ObjectId[];
  additionalInstructions: string
};

const SubjectInfo = (props: { subject: Subject }) => {
  const auth = useAuth();

  const [currentSubject, setCurrentSubject] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseInstructions, setCourseInstructions] = useState("")

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentSubject(props.subject);
      setCourseName(props.subject.name);
      setCourseDescription(props.subject.courseDescription);
      setCourseInstructions(props.subject.additionalInstructions)
    }
  }, [auth, props.subject]);

  const subjectMutation = useMutation({
    mutationFn: updateSubject,
    onError: (error) => {
      console.log(error);
      toast.error("could not update course info");
    },
  });

  const updateSubjectMessageMutation = useMutation({
    mutationFn: sendUpdateChatRequest,
    onError: (error) => {
      console.log(error);
      toast.error("could not update course");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

    if(!courseDescription) return toast.error("Course description required")

    if(!courseName) return toast.error("Course name required")

      const newSubjectInfo = {
        ...currentSubject,
        name: courseName,
        courseDescription,
        additionalInstructions: courseInstructions
      };
      await subjectMutation.mutateAsync(newSubjectInfo);
      await newSubjectInfo.classrooms.map((classroomId) => {
        const req = {
            classroomId,
            subjectName: newSubjectInfo.name,
            vectorStoreFileId: newSubjectInfo.vectorStoreFileId,
            additionalInstructions: newSubjectInfo.additionalInstructions
        }
        updateSubjectMessageMutation.mutateAsync(req)
    })
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
        margin: "0 auto",
        padding: "1rem",
        boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
        borderRadius: "10px",
        maxWidth: "600px",
        width: "90%",
      }}
    >
      <Box
        sx={{
          alignContent: "center",
          alignSelf: "center"
        }}
      >
        <Typography variant="h5">Update Course Info</Typography>
      </Box>
      <EditableInput
        type="text"
        name="courseName"
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
            <EditableInput
        type="text"
        name="courseInstructions"
        label="Additional AI Instructions"
        value={courseInstructions}
        rows={5}
        onChange={(e) => setCourseInstructions(e.target.value)}
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
        disabled={subjectMutation.isPending ? true : false}
      >
        {subjectMutation.isPending ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          "Update Course"
        )}
      </Button>
    </form>
  );
};

export default SubjectInfo;
