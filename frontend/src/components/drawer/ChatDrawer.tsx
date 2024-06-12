import React, { useState } from "react";
import {
  IconButton,
Box,
SwipeableDrawer
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import TeacherChat from "../chat/TeacherChat";


const ChatDrawer = (
  props: 
  {classroom, 
    currentUser, 
    // handleSetSocketMessage, 
    // receivedMessage
  }
) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen)
  }

  const chatBox = (

    <Box 
          sx={{height:"100%"}}>
    <TeacherChat
    classroom = {props.classroom}
    currentUser={props.currentUser}
    // handleSetSocketMessage = {props.handleSetSocketMessage} 
    // receivedMessage={props.receivedMessage}
    />
    </Box>
  )
   

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        ModalProps={{ onBackdropClick: toggleDrawer(false) }}
        onClose={() => {toggleDrawer(false)}}
        onOpen={() => {toggleDrawer(true)}}
        PaperProps={{
            sx:{
                backgroundColor: "transparent",
                height:"90vh",
                maxWidth:"500px"
        }
        }}
      >
        {chatBox}
      </SwipeableDrawer>
      <IconButton
        sx={{ textAlign:'center', padding:"8px 8px 0px 8px" }}
        onClick={toggleDrawer(true)}
      >
        <MessageIcon sx={{color:"primary.main"}} />
      </IconButton>
    </React.Fragment>
  );
};

export default ChatDrawer;