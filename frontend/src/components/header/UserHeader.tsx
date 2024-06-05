import{ useState } from "react";
import {
    AppBar,
    Avatar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem
  } from "@mui/material";
  import Logo from "../shared/Logo";
  import { Link } from "react-router-dom";
  import MenuIcon from '@mui/icons-material/Menu';

  // import NavigationLink from "./shared/NavigationLink";
  
  const UserHeader = (props:{auth, handleDrawerToggle, drawerWidth}) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


      const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
        <AppBar
          position= "fixed"
          sx={{ bgcolor: "#001e1d", boxShadow: "none", height: "65px", width: { sm: `calc(100% - ${props.drawerWidth}px)` },
          ml: { sm: `${props.drawerWidth}px` },}}
        >
        <Toolbar sx={{ display: "flex" }}>
        <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color:"white" }}
          >
            <MenuIcon />
          </IconButton>
          <Logo />
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={props.auth.user?.avatarUrl}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem       
                component={Link} 
                to={`/account-settings`}
                onClick={handleClose}
                >Edit Profile
                </MenuItem>
                <MenuItem 
                onClick={props.auth.logout}
                component={Link} 
                to={`/`}
                >Logout</MenuItem>
              </Menu>
  
        </Toolbar>
      </AppBar>
    );
  };
  
  export default UserHeader;