import { Box, Typography } from '@mui/material'
import CustomAvatar from '../shared/CustomAvatar'

const TeacherChatItem = (props:{
  message
  currentUser
  otherUser
  scroll
}) => {
  return (
    <>
              <Box
                ref={props.scroll}
                sx={{
                  padding: "0.7rem",
                  borderRadius:
                    props.message.senderId !== props.currentUser._id
                      ? "1rem 1rem 1rem 0"
                      : "1rem 1rem 0 1rem",
                  maxWidth: "28rem",
                  width: "fit-content",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  alignSelf:
                    props.message.senderId !== props.currentUser._id
                      ? "flex-start"
                      : "flex-end",
                  bgcolor:
                    props.message.senderId !== props.currentUser._id
                      ? "white"
                      : "secondary.main",
                }}
              >
                <Typography
                  variant="body2"
                  alignSelf={"end"}
                  color={
                    props.message.senderId !== props.currentUser._id
                      ? "primary"
                      : "white"
                  }
                  sx={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                >
                  {props.message.text}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  alignSelf:
                    props.message.senderId !== props.currentUser._id
                      ? "flex-start"
                      : "flex-end",
                  gap: "5px",
                }}
              >
                {props.message.senderId !== props.currentUser._id ? (
                  <>
                    <CustomAvatar
                      firstName={props.otherUser.firstname}
                      lastName={props.otherUser.lastname}
                      avatarUrl={props.otherUser.avatarUrl}
                      size={24}
                    />
                    <Typography variant="caption" alignSelf={"center"}>
                      {props.otherUser.firstname}
                    </Typography>
                  </>
                ) : (
                  <>
                    <CustomAvatar
                      firstName={props.currentUser.firstname}
                      lastName={props.currentUser.lastname}
                      avatarUrl={props.currentUser.avatarUrl}
                      size={24}
                    />
                    <Typography variant="caption">You</Typography>
                  </>
                )}
              </Box>
            </>
  )
}

export default TeacherChatItem