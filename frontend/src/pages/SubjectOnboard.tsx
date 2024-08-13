import { useEffect } from "react";

import { Box, Button, ButtonBase, Card, CardContent, Typography } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import { useParams } from "react-router-dom";


const SubjectOnboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams()

  useEffect(() => {
    if (!auth?.user) {
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
          </Box>
          <Typography variant="h5">Your course  was created!</Typography>
          <Box display={"flex"} justifyContent={"center"} gap={"15px"}>
            <Card
              variant="outlined"
              sx={{ width: 175, height: 175, borderRadius: "10px" }}
            >
              <ButtonBase onClick={() => navigate(`/${id}/update`)}>
                <CardContent>
                  <AccountCircleIcon color="secondary" />
                  <Typography>
                    Add AI instructions, videos or update your course info
                  </Typography>
                </CardContent>
              </ButtonBase>
            </Card>
            {auth?.user?.isTeacher ? (
              <Card
                variant="outlined"
                sx={{ width: 175, height: 175, borderRadius: "10px" }}
              >
                <ButtonBase onClick={() => navigate('/portal')}>
                  <CardContent>
                    <SchoolIcon color="secondary" />
                    <Typography>Go to Teacher Portal</Typography>
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

export default SubjectOnboard;
