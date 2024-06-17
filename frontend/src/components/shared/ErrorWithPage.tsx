
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";


const ErrorWithPage = ()=> {
    return (
        <Box
        sx={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:'center',
          height:"100%"
        }}>
        <Card
        sx={{maxWidth:"300px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
        boxShadow:"none"
      }}
        >
          <CardMedia 
          component="img"
          alt="server down"
          image="https://storage.googleapis.com/u4e/assets/undraw_server_down_s-4-lk.svg"
          />
          <CardContent>
  
          <Typography variant="body1" color="text.secondary">
            Something went wrong. Please refresh page.
          </Typography>
        </CardContent>
  
        </Card>
      </Box>
    );
  }

export default ErrorWithPage