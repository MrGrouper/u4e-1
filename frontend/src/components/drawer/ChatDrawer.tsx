import React, { useState } from "react";
import {
  Drawer,
  IconButton,

} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import TeacherChat from "../chat/TeacherChat";


const ChatDrawer = (props: {classroom, currentUser, handleSetSocketMessage, receivedMessage}
) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
            sx:{
                backgroundColor: "transparent",
                padding: '20px'
        }
        }}
      >
        <TeacherChat
        classroom = {props.classroom}
        currentUser={props.currentUser}
        handleSetSocketMessage = {props.handleSetSocketMessage} 
        receivedMessage={props.receivedMessage}
        />
      </Drawer>
      <IconButton
        sx={{ color: "white", textAlign:'center' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MessageIcon sx={{color:"#ffffff"}} />
      </IconButton>
    </React.Fragment>
  );
};

export default ChatDrawer;