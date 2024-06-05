import { useEffect, useState } from "react";

import { Box } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import SubjectImage from "../components/subject/SubjectImage";
import SubjectVideos from "../components/subject/SubjectVideos";
import SubjectInfo from "../components/subject/SubjectInfo";
import { getSubject } from "../helpers/api-communicator";


const SubjectUpdate = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams()

  const [subject, setSubject] = useState(null)

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    const handleData = async () => {
        try {
        const subject = await getSubject(id)
        setSubject(subject)

      }
        catch (error) {
          console.log(error)
      }
    }
        handleData()
  
  }, []);


  if(subject){
  return (
    <div>
      <Box
        display={"flex"}
        flexWrap={'wrap'}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
          <SubjectInfo
          subject={subject}
          />
        <SubjectImage
        subject = {subject}
        />
        <SubjectVideos 
        subject = {subject}
        />
         
      </Box>
    </div>
  )}
  else return <></>
};

export default SubjectUpdate;
