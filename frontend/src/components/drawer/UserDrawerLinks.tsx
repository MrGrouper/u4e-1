import { useAuth } from '../../context/AuthContext'
import { Box, Button, Divider, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from '@mui/icons-material/Home';

const UserDrawerLinks = ({ handleDrawerClose }) => {
    const auth = useAuth()
    const theme = useTheme();
    const navigate = useNavigate()
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{display:'flex', flexWrap:'nowrap', flexDirection:'column', alignItems:"flex-start", paddingTop:"20px", gap:"10px"}}>

    {auth?.user?.isTeacher ? 
    <Button 
     
    startIcon={<SpaceDashboardIcon/>} 
    onClick={() => {
       if (isMatch ){handleDrawerClose()}
      navigate("/portal")

    }}
    size='medium'
            sx={{paddingLeft:"25px", 
        width:"200px", 
        display:"flex",
        justifyContent:"flex-start",
        borderTopRightRadius:"20px",
        borderBottomRightRadius:"20px",
        }}>
        Teacher Portal
    </Button>
      : null }
      <Button 
       
      startIcon={<DashboardIcon/>} 
      onClick={() => {
        if (isMatch ){handleDrawerClose()}
        navigate("/dashboard")
      }}
      size='medium'
      sx={{paddingLeft:"25px", 
      width:"200px", 
      display:"flex",
      justifyContent:"flex-start",
      borderTopRightRadius:"20px",
      borderBottomRightRadius:"20px",
    //   ':hover':{
    //       bgcolor:'info.light'
    //   }
      }}>
        Student Dashboard
      </Button>
      <Divider />
      <Button 
        startIcon={<HomeIcon/>} 
        onClick={() => {
          handleDrawerClose()
          navigate("/")
        }}
        size='medium'
        sx={{paddingLeft:"25px", 
        width:"200px", 
        display:"flex",
        justifyContent:"flex-start",
        borderTopRightRadius:"20px",
        borderBottomRightRadius:"20px",
        }}
        >
            Home
    </Button>
      <Button 
      startIcon={<LibraryBooksIcon/>} 
      onClick={() => {
        if (isMatch ){handleDrawerClose()}
        navigate("/catalog")
      }}
      size='medium'
              sx={{paddingLeft:"25px", 
        width:"200px", 
        display:"flex",
        justifyContent:"flex-start",
        borderTopRightRadius:"20px",
        borderBottomRightRadius:"20px",
        }}>
        Course Catalog
      </Button>
    <Button 
      startIcon={<SettingsIcon/>} 
      onClick={() => {
        if (isMatch ){handleDrawerClose()}
        navigate("/account-settings")
      }}
      size='medium'
              sx={{paddingLeft:"25px", 
        width:"200px", 
        display:"flex",
        justifyContent:"flex-start",
        borderTopRightRadius:"20px",
        borderBottomRightRadius:"20px",
        }}>
        Settings
      </Button>
      <Button 
      startIcon={<LogoutIcon/>} 
      onClick={auth.logout} 
      component={Link} to={`/`}
      size='medium'
              sx={{paddingLeft:"25px", 
        width:"200px", 
        display:"flex",
        justifyContent:"flex-start",
        borderTopRightRadius:"20px",
        borderBottomRightRadius:"20px",
        }}>
        Logout
      </Button>
    </Box>

  )
}

export default UserDrawerLinks