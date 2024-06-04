import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserClassrooms, getAllSubjects } from "../helpers/api-communicator";
import Class from "../components/Class";
//@ts-expect-error jdslajf
import { toast } from "react-hot-toast";
import { Box } from "@mui/material";
import CourseCard from "../components/subject/CourseCard";

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth?.user;
  const [classrooms, setClassrooms] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);

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

  const handleEnroll = (subject) => {
    setEnrolledSubjects([...enrolledSubjects, subject]);
    getUserClassrooms(auth.user._id).then((data) => {
      setClassrooms(data);
    });
  };

  const subjectMap = availableSubjects.reduce((map, subject) => {
    map[subject.id] = subject;
    return map;
  }, {});

  if (user.isTeacher === false) {
    return (
      <>
        <div className="dashboard-container">
          <h1>Enrolled classes</h1>
          <Box
            sx={{
              display: "flex",
              gap: "25px",
              flexWrap: "wrap",
            }}
          >
            {classrooms.map((classroom) => {
              const subject = subjectMap[classroom.subjectId];
              return subject ? (
                <CourseCard
                  subject={subject}
                  classroomId={classroom.id}
                  isEnrolled={true}
                  key={`enrolled-${classroom.id}`}
                  onEnroll={() => handleEnroll(subject)}
                />
              ) : null;
            })}
          </Box>

          <div>
            <h1>Available classes</h1>
            <Box
              sx={{
                display: "flex",
                gap: "25px",
                flexWrap: "wrap",
              }}
            >
              {availableSubjects.map((subject) => (
                <CourseCard
                  key={`all-${subject.id}`}
                  classroomId={null}
                  subject={subject}
                  isEnrolled={classrooms.some((classroom) =>
                    subject.classrooms.includes(classroom.id)
                  )}
                  onEnroll={() => handleEnroll(subject)}
                />
              ))}
            </Box>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="dashboard-container">
        <h1>Active classes</h1>
        <div className="Classroom-List">
          {classrooms.map((classroom) => (
            <Class data={classroom} currentUser={auth?.user} key={classroom.id} />
          ))}
        </div>
      </div>
    );
  }
};

export default Dashboard;
