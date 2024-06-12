import { useEffect } from "react";

import { Box } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import  AvatarUpload  from "../components/account/AvatarUpload"
import UserInfo from "../components/account/UserInfo";


const AccountSettings = () => {
  const auth = useAuth();
  const navigate = useNavigate();

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
        flexWrap={"wrap"}
        gap={"25px"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <AvatarUpload />
        <UserInfo />
         
      </Box>
    </div>
  );
};

export default AccountSettings;
