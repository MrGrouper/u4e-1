import { useEffect, useState} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserClassrooms, getAllUsers, sendCreateClassroomRequest, sendInitialChatRequest } from "../helpers/api-communicator";
import Class from "../components/Class";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth?.user;
  const [classrooms, setClassrooms] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([])

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      getUserClassrooms(auth.user._id).then((data) => {
        setClassrooms(data);
      });
    }
  }, []);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      getAllUsers().then((data) => {
        data.users.map((user)=>{
          if (user.isTeacher == true){
          const classes = {
            firstName: user.firstname,
            lastName: user.lastname,
            subjects: user.subjects,
            id: user.id
          }
          setAvailableClasses([...availableClasses, classes])
        }
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  const handleEnroll = async (subject, teacherId) => {
    const req = {
      senderId: user._id,
      receiverId: teacherId,
      subject: subject
    }

    try{
      toast.loading('enrolling...')
      const data = await sendCreateClassroomRequest(req)
      await sendInitialChatRequest(data, req.senderId)
      toast.dismiss()
      setClassrooms([...classrooms, data])

    } catch {
      console.log("cannot create classroom")
      toast.error('could not generate response')
  
  }}

  console.log(user)

  if (user.isTeacher === false)  {return (
    <>
      <div className="dashboard-container">
        <h1>Enrolled classes</h1>
        <div className="Classroom-List">
          {classrooms.map((classroom) => (
            <Class 
              data={classroom}
              currentUser={auth?.user}
               />
          ))}
        </div>
      
      <div>
        <h1>Available classes</h1>
        <h2>click to enroll</h2>
        <div className="Classroom-List">
          {availableClasses.map((teacher) => (
            teacher.subjects.map((subject) => (          
            <p 
              onClick = {()=>handleEnroll(subject, teacher.id)}
              style={{ background: "transparent", color: "white", cursor: "pointer" }}
              >
               { subject }
                </p>))
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
  else {
    return (
      <div className="dashboard-container">
      <h1>Active classes</h1>
      <div className="Classroom-List">
        {classrooms.map((classroom) => (
          <Class 
            data={classroom}
            currentUser={auth?.user}
             />
        ))}
      </div>
    </div>
    )
  }
};

export default Dashboard;
