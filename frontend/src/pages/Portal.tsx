import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getSubject, getUserClassrooms } from "../helpers/api-communicator";
import { Box } from "@mui/material";
import ActiveClassCard from "../components/class/ActiveClassCard";
import Typography from "@mui/material/Typography";
import CourseCard from "../components/subject/CourseCard";

const Portal = () => {
  const auth = useAuth();
  //@ts-expect-error afdas
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const data = await Promise.all(
        auth.user.subjects.map(async (subjectId) => {
          const subject = await getSubject(subjectId);
          return subject;
        })
      );
      setSubjects(data);
    };

    if (auth?.isLoggedIn && auth.user) {
      getUserClassrooms(auth.user._id).then((data) => {
        setClassrooms(data);
      });

      fetchSubjects();
    }
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <h1>Active Classes</h1>
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {classrooms.length == 0 ? (
            <Typography variant="h5">No Active Classes</Typography>
          ) : (
            classrooms.map((classroom) => {
              return (
                <ActiveClassCard
                  teacherId={auth.user._id}
                  classroom={classroom}
                />
              );
            })
          )}
        </Box>
      </div>
      <div className="dashboard-container">
        <h1>Your Offered Courses</h1>
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {subjects.length == 0 ? (
            <Typography variant="h5">No Active Courses</Typography>
          ) : (
            subjects.map((subject) => {
              return (
                <CourseCard
                  subject={subject}
                  classroomId={null}
                  isEnrolled={false}
                  onEnroll={null}
                />
              );
            })
          )}
        </Box>
      </div>
    </>
  );
};

export default Portal;
