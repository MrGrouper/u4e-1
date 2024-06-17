import { useEffect } from "react";

import { Box } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import SubjectImage from "../components/subject/SubjectImage";
import SubjectVideos from "../components/subject/SubjectVideos";


const SubjectOnboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const data = location.state

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  



  return (
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
        gap={"25px"}
        flexWrap={"wrap"}
      >
        <SubjectImage
        subject = {data}
        />
        <SubjectVideos 
        subject = {data}
        />
         
      </Box>

  );
};

export default SubjectOnboard;
