import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getSubjectWithClassrooms } from "../helpers/api-communicator";
import { Box, Button } from "@mui/material";
import ActiveClassCard from "../components/class/ActiveClassCard";
import Typography from "@mui/material/Typography";
import TeacherCard from "../components/subject/TeacherCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useQueries } from "@tanstack/react-query";
import ErrorWithPage from "../components/shared/ErrorWithPage";
import LoadingPage from "../components/shared/LoadingPage";

const Portal = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const subjectArr = auth.user.subjects;

  const subjectQueries = useQueries({
    queries: subjectArr.map((subjectId) => {
      return {
        queryKey: ["subject", subjectId],
        queryFn: () => getSubjectWithClassrooms(subjectId),
      };
    }),
  });

  const isLoading = subjectQueries.some((query) => query.isLoading);
  const isError = subjectQueries.some((query) => query.isError);

  const classrooms = [];
  const subjects = subjectQueries.map((query) => {
    if (query.data) {
      query.data.classrooms.forEach((classroom) => classrooms.push(classroom));
    }
    return query.data;
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorWithPage />;
  }

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 110px)",
        overflow: "hidden",
        overflowY: "scroll",
        gap: "25px",
      }}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          variant="h4"
          sx={{
            padding: "20px 20px 0px 20px",
          }}
        >
          Active Classes
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {classrooms?.length == 0 ? (
            <Typography variant="h6">No Active Classes</Typography>
          ) : (
            classrooms?.map((classroom) => {
              return (
                <ActiveClassCard
                  key={classroom.id}
                  teacherId={auth.user._id}
                  classroom={classroom}
                />
              );
            })
          )}
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "15px",
            paddingBottom: "20px",
          }}
        >
          <Typography variant="h4">Your Offered Courses</Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate("/addsubject")}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "5px",
              }}
            >
              <AddCircleOutlineIcon />
              Add New Course
            </Box>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {subjects?.length === 0 ? (
            <Typography variant="h5">No Active Courses</Typography>
          ) : (
            subjects?.map((subject) => {
              console.log(subject);
              return <TeacherCard key={subject.id} subject={subject} />;
            })
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Portal;
