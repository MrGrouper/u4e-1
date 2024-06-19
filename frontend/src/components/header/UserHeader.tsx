import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import Logo from "../shared/Logo";
import { Link } from "react-router-dom";
import UserDrawer from "../drawer/UserDrawer";
import { useAuth } from "../../context/AuthContext";
import HeaderAvatar from "../shared/HeaderAvatar";

const UserHeader = (props) => {
  const { handleDrawerToggle } = props;
  const auth = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        boxShadow: "none",
        height: "65px",
        width: "100%",
        borderBottom: ".0625rem solid #e0e0e0;",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <UserDrawer handleDrawerToggle={handleDrawerToggle} />
          <Logo />
        </Box>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <HeaderAvatar size={40}/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={Link} to={`/account-settings`} onClick={handleClose}>
            Edit Profile
          </MenuItem>
          <MenuItem onClick={auth.logout} component={Link} to={`/`}>
            Log Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
