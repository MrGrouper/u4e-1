import {
    Box,
    Avatar,
    Typography,
    CircularProgress,
  } from "@mui/material";

const ChatItemLoading = () => {
    return (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            borderRadius: 2,
            maxWidth:"800px"
          }}
        >
    
          <Avatar 
          src = {window.location.origin + '/U4E-AI-Icon-cropped.png'}
          alt = 'teacher'
          sx={{height:"24px", width:"24px"}}
          />
          
          <Box
              sx={{
                display:"flex",
                flexDirection:"row",
                gap: "20px"
              
              }}
              >
                <Typography variant='h6'>AI Teacher</Typography>
                <CircularProgress size={"20px"} color="secondary" sx={{alignSelf: "center" }}/>

              </Box>
        </Box>
      );
}

export default ChatItemLoading