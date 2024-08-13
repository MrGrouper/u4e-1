import { useEffect } from "react";

import { Box, Button } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../components/account/AvatarUpload";
import UserInfo from "../components/account/UserInfo";

const AccountSettings = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user || !auth.isLoggedIn) {
      return navigate("/login");
    }
  }, [auth, navigate]);

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
        <AvatarUpload />
        <UserInfo />
        <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/change-password")}
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  borderRadius: 2,
                }}>
          Change Password
        </Button>
      </Box>
  );
};

export default AccountSettings;
