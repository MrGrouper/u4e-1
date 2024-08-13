import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Badge,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { sendUpdateChatRequest, uploadCurriculum } from "../../helpers/api-communicator";
import { updateSubject } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { Types } from "mongoose";
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

const Curriculum = (props: { subject: Subject }) => {
  const auth = useAuth();

  const [curriculum, setCurriculum] = useState<any>(null);
  const [url, setUrl] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentSubject(props.subject);
      if (props.subject.curriculum) {
        setUrl(props.subject.curriculum);
      }
    }
  }, [auth, props.subject]);

  const curriculumMutation = useMutation({
    mutationFn: uploadCurriculum,
    onError: (error) => {
      console.log(error);
      toast.error("could not upload image");
    },
  });

  const subjectMutation = useMutation({
    mutationFn: updateSubject,
    onError: (error) => {
      console.log(error);
      toast.error("could not update course");
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
    if (curriculum) {
      const data = new FormData();
      data.append("curriculum", curriculum);
      try {
        const curriculumRes = await curriculumMutation.mutateAsync(data);
        console.log("curriculumRes", curriculumRes)
        const newSubjectInfo = { ...props.subject, curriculum: curriculumRes.curriculumUrl, vectorStoreFileId: curriculumRes.vectorStoreFileId };
        const updatedSubject = await subjectMutation.mutateAsync(
          newSubjectInfo
        );
         await newSubjectInfo.classrooms.map((classroomId) => {
            const req = {
                classroomId,
                subjectName: newSubjectInfo.name,
                vectorStoreFileId: newSubjectInfo.vectorStoreFileId,
                additionalInstructions: newSubjectInfo.additionalInstructions
            }
            updateSubjectMessageMutation.mutateAsync(req)
        })
        setCurrentSubject(updatedSubject);
        toast.success("Curriculum changed!");
      } catch (error) {
        console.log(error);
        toast.error("Could not upload curriculum");
      }
    } else {
      toast.error("Please select an curriculum");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCurriculum(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
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
        width: "90%",
        maxWidth: "600px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingBottom={"15px"}
      >
        {currentSubject && currentSubject.curriculum ? (
          <Typography variant="h5">Change Curriculum</Typography>
        ) : (
          <Typography variant="h5">Add Curriculum</Typography>
        )}
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Badge
          badgeContent={"+"}
          color="secondary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          onClick={() => fileInput.current.click()}
          sx={{
            "& .MuiBadge-badge": {
              color: "secondary",
              fontSize: "30px",
              fontWeight: "200",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
            },
            ":hover": {
              cursor: "pointer",
            },
          }}
          overlap="circular"
        >
          <object width="100%" height="300px" data={url} type="application/pdf">
            {" "}
          </object>
        </Badge>
      </Box>
      <input
        type="file"
        accept=".pdf"
        multiple={false}
        onChange={handleChange}
        ref={fileInput}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          display: "flex",
          py: 1,
          mt: 2,
          width: "100%",
          gap: "5px"
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          sx={{
            borderRadius: 2,
            width: "50%",
            px: 2,
          }}
          href={props.subject.curriculum}
        >
          View Current
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          sx={{
            borderRadius: 2,
            width: "50%",
            px: 2,
          }}
          disabled={
            subjectMutation.isPending || curriculumMutation.isPending
              ? true
              : false
          }
        >
          {subjectMutation.isPending || curriculumMutation.isPending ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            "Use Curriculum"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default Curriculum;
