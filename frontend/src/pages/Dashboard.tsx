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

  useEffect(()=>{
    if (auth?.isLoggedIn && auth.user) {
      getAllSubjects().then((data) => {
        setAvailableSubjects(data)
    })
  }
  },[auth?.isLoggedIn, auth.user])

  useEffect(()=>{
    if (auth?.isLoggedIn && auth.user) {
      const classroomSubjectIds = new Set(classrooms.map(classroom => classroom.subjectId));
      console.log('classroomSubjectIds', classroomSubjectIds)

      // Step 2: Use reduce to collect matching subjects
      const matchingSubjects = availableSubjects.reduce((acc, subject) => {
        console.log('acc,sub',acc, subject)
        if (classroomSubjectIds.has(subject.id)) {
          acc.push(subject);
        }
        return acc;
      }, []);
      console.log('matchingSubjects', matchingSubjects)
      
      setEnrolledSubjects(matchingSubjects)
    }
  },[classrooms, availableSubjects])

  // useEffect(() => {
  //   const fetchAvailableSubjects = async () => {
  //     const allSubjects = await getAllSubjects();
  //     const userClassroomsSet = new Set(
  //       classrooms.map((classroom) => classroom.id)
  //     );
  //     const availableResults = allSubjects.filter(
  //       (subject) => !userClassroomsSet.has(subject.classrooms)
  //     );
  //     setAvailableSubjects(availableResults);
  //     const enrolledResults = allSubjects.filter((subject) =>
  //       userClassroomsSet.has(subject.classrooms)
  //     );
  //     setEnrolledSubjects(enrolledResults);
  //   };
  //   if (auth?.isLoggedIn && auth.user) {
  //     fetchAvailableSubjects();
  //   }
  // }, [classrooms]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  // const handleEnroll = async (subject, teacherId) => {
  //   const req = {
  //     senderId: user._id,
  //     receiverId: teacherId,
  //     subject: subject
  //   }

  //   try{
  //     toast.loading('enrolling...')
  //     const data = await sendCreateClassroomRequest(req)
  //     await sendInitialChatRequest(data, req.senderId)
  //     toast.dismiss()
  //     setClassrooms([...classrooms, data])

  //   } catch {
  //     console.log("cannot create classroom")
  //     toast.error('could not generate response')

  // }}

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
            {enrolledSubjects.map((subject, index) => 
              <CourseCard subject={subject} isEnrolled={true} key={index} onEnroll={()=>{console.log(`yo`)}}/>
            )}
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
              {availableSubjects.map((subject, index) => (
                <CourseCard subject={subject} key={index} isEnrolled={false} onEnroll={()=>setEnrolledSubjects(enrolledSubjects.concat(subject))} />
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
            <Class data={classroom} currentUser={auth?.user} />
          ))}
        </div>
      </div>
    );
  }
};

export default Dashboard;
