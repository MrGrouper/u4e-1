import React, { useState } from "react";
import { Box, SwipeableDrawer, Typography, Button } from "@mui/material";
// import MessageIcon from "@mui/icons-material/Message";
import TeacherChat from "../chat/TeacherChat";
import CustomAvatar from "../shared/CustomAvatar";

const ChatDrawer = (props: {
  classroom;
  currentUser;
  otherUser;
  isTeacher;
  // handleSetSocketMessage,
  // receivedMessage
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const chatBox = (
    <Box sx={{ height: "100%" }}>
      <TeacherChat
        classroom={props.classroom}
        currentUser={props.currentUser}
        otherUser={props.otherUser}
        // handleSetSocketMessage = {props.handleSetSocketMessage}
        // receivedMessage={props.receivedMessage}
      />
    </Box>
  );

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="bottom"
        open={openDrawer}
        ModalProps={{ onBackdropClick: toggleDrawer(false) }}
        onClose={() => {
          toggleDrawer(false);
        }}
        onOpen={() => {
          toggleDrawer(true);
        }}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            height: "90vh",
            maxWidth: "500px",
          },
        }}
      >
        {chatBox}
      </SwipeableDrawer>

      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
          mt: "10px",
          mb:"10px"
        }}
        variant="outlined"
        onClick={toggleDrawer(true)}
      >
        <CustomAvatar
          firstName={props.otherUser.firstname}
          lastName={props.otherUser.lastname}
          avatarUrl={props.otherUser.avatarUrl}
          size={30}
        />
        {props.isTeacher ? (
          <Typography variant="body1"> Chat with your student</Typography>
        ) : (
          <Typography variant="body1"> Chat with your Instructor</Typography>
        )}
      </Button>
      {/* <IconButton
          sx={{ textAlign: "center", padding: "8px 8px 0px 8px" }}
          onClick={toggleDrawer(true)}
        >
          <MessageIcon sx={{ color: "primary.main" }} />
        </IconButton> */}
    </React.Fragment>
  );
};

export default ChatDrawer;
