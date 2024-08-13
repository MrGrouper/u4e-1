import { useEffect } from "react";

import { Box, Button, ButtonBase, Card, CardContent, Typography } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";
import CustomAvatar from "../components/shared/CustomAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";

const Onboard = () => {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          padding: "30px",
          boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
          borderRadius: "10px",
          border: "none",
          width: "90%", // Adjust width for mobile responsiveness
          maxWidth: "600px", // Maximum width for larger screens
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"15px"}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <Logo />
          </Box>
          <Typography variant="h5">You're signed in</Typography>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"15px"}
          >
            <CustomAvatar
              firstName={auth?.user?.firstname}
              lastName={auth?.user?.lastname}
              avatarUrl={auth?.user?.avatarUrl}
              size={30}
            />
            <Typography>{auth?.user?.email}</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"} gap={"15px"}>
            <Card
              variant="outlined"
              sx={{ width: 175, height: 175, borderRadius: "10px" }}
            >
              <ButtonBase onClick={() => navigate("/account-settings")}>
                <CardContent>
                  <AccountCircleIcon color="secondary" />
                  <Typography>
                    Add a profile picture and add to your account profile
                  </Typography>
                </CardContent>
              </ButtonBase>
            </Card>
            {auth?.user?.isTeacher ? (
              <Card
                variant="outlined"
                sx={{ width: 175, height: 175, borderRadius: "10px" }}
              >
                <ButtonBase onClick={() => navigate("/addsubject")}>
                  <CardContent>
                    <SchoolIcon color="secondary" />
                    <Typography>Create your first course</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            ) : (
              <Card
                variant="outlined"
                sx={{ width: 175, height: 175, borderRadius: "10px" }}
              >
                <ButtonBase onClick={() => navigate("/catalog")}>
                  <CardContent>
                    <SchoolIcon color="secondary" />
                    <Typography>Check out our course offerings</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            )}
          </Box>
          {auth?.user?.isTeacher ?
          <Button onClick={()=>navigate("/portal")}>Not now</Button>
          :
          <Button onClick={()=>navigate("/dashboard")}>Not now</Button>}
        </Box>
      </Box>
    </Box>
  );
};

export default Onboard;
