import { useParams } from "react-router-dom";
import { getSubjectWithClassrooms, getUser } from "../helpers/api-communicator";
import {
  sendCreateClassroomRequest,
  sendInitialChatRequest,
} from "../helpers/api-communicator";
import {
  Box,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
// import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingPage from "../components/shared/LoadingPage";
import ErrorWithPage from "../components/shared/ErrorWithPage";

const AboutCourse = () => {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const { data: subject } = useQuery({
    queryKey: ["subject", id],
    queryFn: () => getSubjectWithClassrooms(id),
  });

  console.log("subject", subject)
  const teacherId = subject?.teacherId;

  const {
    isPending,
    isError,
    error,
    data: teacher,
  } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => getUser(teacherId),
    enabled: !!teacherId,
  });

  const classroomMutation = useMutation({
    mutationFn: sendCreateClassroomRequest,
    onError: (error) => {
      console.log(error);
      toast.error(`could not enroll in ${subject.name}`);
    },
  });

  const initialChatRequestMutation = useMutation({
    mutationFn: sendInitialChatRequest,
    onError: (error) => {
      console.log(error);
      toast.error(`could not enroll in ${subject.name}`);
    },
  });

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    console.log(error);
    return <ErrorWithPage />;
  }

  const handleEnroll = (e) => {
    e.preventDefault();
    const req = {
      studentId: auth.user._id,
      teacherId: subject.teacherId,
      subjectId: subject.id,
    };
    classroomMutation.mutate(req, {
      onSuccess(data) {
        console.log('data', data)
        initialChatRequestMutation.mutate(
          { classroom: data, senderId: req.studentId },
          {
            onSuccess: () => {
              toast.success(`enrolled in ${subject.name}`);
              navigate(`/classroom/${data.id}`);
            },
          }
        );
      },
    });
  };

  if (subject && teacher) {
    return (
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          width={"100%"}
          display="flex"
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            padding={3}
            mt={3}
            display={{ md: "flex", sm: "none", xs: "none" }}
            width={"50%"}
          >
            <img
              src={subject.imageUrl}
              alt="subject.imageUrl"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            padding={3}
            mt={3}
            width={{ sm: "100%" }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
          >
            <Typography align="center" variant="h1">
              {subject.name}
            </Typography>
            <Typography variant="h5">Instructor:</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Avatar
                src={teacher.avatarUrl}
                alt={`${teacher.firstname} ${teacher.lastname}`}
                sx={{ width: 60, height: 60 }}
              />
              <Typography variant="h4">
                {teacher.firstname} {teacher.lastname}
              </Typography>
            </Box>
            {subject?.classrooms.some((classroom) =>
              classroom.studentId === auth.user._id
            ) ? (
              <Button
                size="medium"
                variant="outlined"
                color="secondary"
                disabled
              >
                Already Enrolled
              </Button>
            ) : classroomMutation.isPending ||
              initialChatRequestMutation.isPending ? (
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  size="medium"
                  variant="contained"
                  color="secondary"
                  onClick={handleEnroll}
                  disabled
                >Enrolling</Button>
                <CircularProgress
                  size={24}
                  sx={{
                    color: "secondary.main",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              </Box>
            ) : (
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                onClick={handleEnroll}
              >
                Enroll
              </Button>
            )}
          </Box>
        </Box>
        <Box
          padding={3}
          display={"flex"}
          flexDirection={"column"}
          // justifyContent={"center"}
          // alignItems={'center'}
          gap={"20px"}
        >
          <Typography variant="h5">Course Description</Typography>
          <Typography variant="h6">{subject.courseDescription}</Typography>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default AboutCourse;
