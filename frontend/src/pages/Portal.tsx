import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getSubject, getUserClassrooms } from "../helpers/api-communicator";
import { Box, Button } from "@mui/material";
import ActiveClassCard from "../components/class/ActiveClassCard";
import Typography from "@mui/material/Typography";
import CourseCard from "../components/subject/CourseCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Portal = () => {
  const auth = useAuth();
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
      <Typography 
      variant="h4"
      sx={{
        paddingBottom: '20px'
      }}
      >Active Classes 
      </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {classrooms.length == 0 ? (
            <Typography variant="h6">No Active Classes</Typography>
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
        <Box
        sx={{
          display:"flex",
          alignItems:"center",
          justifyContent: 'flex-start',
          gap:"15px",
          paddingBottom: '20px'
        }}
        >
        <Typography variant="h4">Your Offered Courses</Typography>
        <Button                 
          size="small" 
          variant="outlined"
          onClick={()=>navigate('/addsubject')}
          >
            <Box
                    sx={{
                      display:"flex",
                      alignItems:"center",
                      justifyContent: 'flex-start',
                      gap:"5px"
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
