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
    if (!auth?.user) {
      return navigate("/login");
    }
    if (auth.user.isTeacher == false) {
        return navigate("/dashboard")
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
        <CreateSubject />
         
      </Box>
    </div>
  );
};

export default AddSubject;
