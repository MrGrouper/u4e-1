import { useEffect } from "react";

import { Box } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateSubject from "../components/account/CreateSubject";



const AddSubject = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      return navigate("/login");
    }
    if (auth.user.isTeacher == false) {
        return navigate("/dashboard")
    }
  }, []);

  
  return (
      <Box
      display="flex"
      flexDirection="column"
      flexWrap = "nowrap"
      alignItems="center"
      height= "100%"
      width="100%"
      minHeight="0px"
      gap="20px"
      sx={{
        overflow: "hidden",
        overflowY: "scroll",
        gap: 3,
        pt: 3,
        pb: 3,
        pl: 1,
        pr: 1
      
      }}
      >
        <CreateSubject />
         
      </Box>
  );

};

export default AddSubject;
