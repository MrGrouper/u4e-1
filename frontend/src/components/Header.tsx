// import React from "react";
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Logo from "./shared/Logo";
import { Links } from "./drawer/Links";
import DrawerComp from "./drawer/DrawerComp";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <AppBar
      sx={{
        bgcolor: "white",
        position: "fixed",
        boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
        height: "65px",
      }}
    >
      {isMatch ? (
        <>
          <Toolbar
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
              <DrawerComp />
              <Logo />
            </Box>
          </Toolbar>
        </>
      ) : (
        <>
          <Toolbar
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "45px" }}>
              <Logo />
              <Links />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              {auth?.user ? (
                auth?.user?.isTeacher ? (
                  <>
                    <Button
                      onClick={() => navigate("/portal")}
                      startIcon={<ExitToAppIcon />}
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{
                        borderRadius: "15px",
                      }}
                    >
                      Go to Portal
                    </Button>
                    <Button
                      onClick={auth.logout} component={Link} to={`/`}
                      size="small"
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: "15px",
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate("/Dashboard")}
                      startIcon={<ExitToAppIcon />}
                      size="small"
                      variant="contained"
                      color="secondary"
                      sx={{
                        borderRadius: "15px",
                      }}
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      onClick={auth.logout} component={Link} to={`/`}
                      size="small"
                      variant="outlined"
                      color="secondary"
                      sx={{
                        borderRadius: "15px",
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    size="small"
                    variant="outlined"
                    color="secondary"
                    sx={{
                      borderRadius: "15px",
                    }}
                  >
                    Log in
                  </Button>

                  <Button
                    onClick={() => navigate("/signup")}
                    size="small"
                    color="secondary"
                    variant="contained"
                    sx={{
                      borderRadius: "15px",
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </>
      )}
    </AppBar>
  );
};

export default Header;
