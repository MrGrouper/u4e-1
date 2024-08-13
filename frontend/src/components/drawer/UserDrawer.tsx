import React, { useEffect, useState } from "react";
import { Drawer, IconButton, useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserDrawerLinks from "./UserDrawerLinks";

const UserDrawer = ({ handleDrawerToggle }) => {
  const isLargeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerWidth = "240px";
  
  useEffect(() => {
    handleDrawerToggle(isLargeScreen);
    setOpenDrawer(isLargeScreen)
  }, [isLargeScreen]);

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
          display: { sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <UserDrawerLinks handleDrawerClose = { handleDrawerClose}/>
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
          display: { sm: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <UserDrawerLinks handleDrawerClose={handleDrawerClose}/>
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
