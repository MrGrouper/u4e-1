import React, { useState } from "react";
import {
  Drawer,
  IconButton,

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Links } from "./Links"


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
                backgroundColor: "black",
                mt: "20px"
        }
        }}
      >
        <Links />
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon sx={{color:"#ffffff"}} />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;