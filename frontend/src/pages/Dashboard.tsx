import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserClassrooms, getAllSubjects } from "../helpers/api-communicator";
// import Class from "../components/Class";
//@ts-expect-error jdslajf
import { toast } from "react-hot-toast";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import CourseCard from "../components/subject/CourseCard";

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  // const [enrolledSubjects, setEnrolledSubjects] = useState([]);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      getUserClassrooms(auth.user._id).then((data) => {
        setClassrooms(data);
      });
    }
  }, [auth?.isLoggedIn, auth.user]);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      getAllSubjects().then((data) => {
        setAvailableSubjects(data);
      });
    }
  }, [auth?.isLoggedIn, auth.user]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  // const handleEnroll = (subject) => {
  //   setEnrolledSubjects([...enrolledSubjects, subject]);
  //   getUserClassrooms(auth.user._id).then((data) => {
  //     setClassrooms(data);
  //   });
  // };

  const subjectMap = availableSubjects.reduce((map, subject) => {
    map[subject.id] = subject;
    return map;
  }, {});

  return (
    <>
    {classrooms.length > 0 ? 
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 90px)",
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
            paddingBottom: "25px",
          }}
        >
          {classrooms.map((classroom) => {
            const subject = subjectMap[classroom.subjectId];
            return subject ? (
              <CourseCard subject={subject} classroomId={classroom.id} />
            ) : null;
          })}
        </Box>
      </Box>
    </Box>
    :
    <Box
    sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:'center',
      height:"100%"
    }}>
      <Card
      sx={{maxWidth:"300px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
      boxShadow:"none"
    }}
      >
        <CardMedia 
        component="img"
        alt="learnin"
        image="https://storage.googleapis.com/u4e/assets/undraw_exams_re_4ios.svg"
        />
        <CardContent>

        <Typography variant="body1" color="text.secondary">
          Add a course to get started.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" size="medium" onClick={()=>navigate("/catalog")}>Course Catalog</Button>
      </CardActions>

      </Card>
    </Box>
        }
 </>
  );
};

export default Dashboard;
