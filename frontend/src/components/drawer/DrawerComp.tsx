import React, { useState } from "react";
import {
  Drawer,
  IconButton,

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerLinks from "./DrawerLinks";


const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
            sx:{
              width:"240px"
        }
        }}
      >
        <DrawerLinks />
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="primary" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;