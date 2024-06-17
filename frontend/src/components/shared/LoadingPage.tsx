import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingPage = ()=> {
    return (
      <Box sx={{ display: 'flex', width: "100%", height:"100%", justifyContent:"center", alignItems:"center"}}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

export default LoadingPage