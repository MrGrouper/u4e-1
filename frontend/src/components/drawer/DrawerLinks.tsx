import { Box, Button, Divider } from "@mui/material";
import Logo from "../shared/Logo";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import InfoIcon from "@mui/icons-material/Info";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";

const DrawerLinks = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        height: "100%",
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Logo />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingTop: "20px",
          gap: "10px",
        }}
      >
        <Button
          startIcon={<LibraryBooksIcon />}
          onClick={()=>navigate('/catalog')}
          size="medium"
          sx={{
            width: "200px",
            display: "flex",
            justifyContent: "flex-start",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          Course Catalog
        </Button>
        <Button
          startIcon={<InfoIcon />}
          onClick={() => navigate("/about")}
          size="medium"
          sx={{
            width: "200px",
            display: "flex",
            justifyContent: "flex-start",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          About
        </Button>
        <Button
          startIcon={<AccessibilityNewIcon />}
          onClick={() => navigate("/contribute")}
          size="medium"
          sx={{
            width: "200px",
            display: "flex",
            justifyContent: "flex-start",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          Contribute
        </Button>
        <Divider />

        {auth?.user ? (
          auth?.user.isTeacher ? (
            <>
              <Button
                startIcon={<ExitToAppIcon />}
                onClick={() => navigate("/portal")}
                variant="contained"
                color="secondary"
                size="medium"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  borderRadius: "20px",
                }}
              >
                Go to Portal
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                onClick={auth.logout} component={Link} to={`/`}
                variant="outlined"
                color="secondary"
                size="medium"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  borderRadius: "20px",
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<ExitToAppIcon />}
                onClick={() => navigate("/dashboard")}
                variant="contained"
                color="secondary"
                size="medium"
                sx={{
                  width: "200px",
                  display: "flex",
                  justifyContent: "flex-start",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                Go to Dashboard
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                onClick={auth.logout} component={Link} to={`/`}
                variant="outlined"
                color="secondary"
                size="medium"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  borderRadius: "20px",
                }}
              >
                Log Out
              </Button>
            </>
          )
        ) : (
          <>
            <Button
              startIcon={<PersonAddAlt1Icon />}
              onClick={() => navigate("/signup")}
              size="medium"
              sx={{
                width: "200px",
                display: "flex",
                justifyContent: "flex-start",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              Sign Up
            </Button>

            <Button
              startIcon={<LockOpenIcon />}
              onClick={() => navigate("/login")}
              size="medium"
              sx={{
                width: "200px",
                display: "flex",
                justifyContent: "flex-start",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              Log in
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DrawerLinks;
