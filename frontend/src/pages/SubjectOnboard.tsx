import { useEffect } from "react";

import { Box } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import SubjectImage from "../components/subject/subjectImage";


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
    <div>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <SubjectImage
        subject = {data}
        
        />
         
      </Box>
    </div>
  );
};

export default SubjectOnboard;
