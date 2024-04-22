// import React from "react";
import {
  AppBar,
  // Button,
  // Tab,
  // Tabs,
  Toolbar,
  // Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Logo from "./shared/Logo";
import { Links } from "./drawer/Links";
import DrawerComp from "./drawer/DrawerComp";
// import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar
      sx={{ bgcolor: "#001e1d", position: "fixed", boxShadow: "none", height: "65px"}}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        {isMatch ? (<DrawerComp />):(<Links />)}

      </Toolbar>
    </AppBar>
  );
};

export default Header;