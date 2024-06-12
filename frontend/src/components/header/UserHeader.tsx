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
import CustomAvatar from "../shared/CustomAvatar";

const UserHeader = (props) => {
  const { auth, handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  console.log(props.auth)

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
          <CustomAvatar firstName={props.auth?.user?.firstname} lastName={props.auth?.user?.lastname}avatarUrl={auth?.user?.avatarUrl} size={40}/>
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
