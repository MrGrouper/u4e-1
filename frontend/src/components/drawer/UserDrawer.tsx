import React, { useState } from "react";
import { Drawer, IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserDrawerLinks from "./UserDrawerLinks";

const UserDrawer = ({ handleDrawerToggle }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerWidth = "240px";


  const handleDrawerOpen = () => {
    setOpenDrawer(true);
    handleDrawerToggle(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    handleDrawerToggle(false);
  };


  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            mt: "65px"
          }
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <UserDrawerLinks />
      </Drawer>
      <Drawer
        anchor="left"
        variant="persistent"
        open={openDrawer}
        PaperProps={{
          sx: {
            mt: "65px"
          }
        }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <UserDrawerLinks />
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", paddingLeft:"0px", paddingRight:"20px"}}
        onClick={openDrawer ? handleDrawerClose : handleDrawerOpen}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default UserDrawer;
