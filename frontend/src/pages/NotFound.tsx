import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Box
    sx={{
      alignSelf:"center",
      width:"100%",
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
      image="https://storage.googleapis.com/u4e/assets/undraw_startled_-8-p0r.svg"
      />
      <CardContent>

      <Typography variant="body1" color="text.secondary">
        This page doesnt exist or you don't have access.
      </Typography>
      <Button variant="contained" color="secondary" onClick={()=>navigate("/")}>
        Go Home
      </Button>
    </CardContent>

    </Card>
  </Box>
);
}

export default NotFound