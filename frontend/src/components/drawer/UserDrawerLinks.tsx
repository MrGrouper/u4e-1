import { useAuth } from '../../context/AuthContext'
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Divider } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const UserDrawerLinks = () => {
    const auth = useAuth()
    const navigate = useNavigate()

  return (
    <Box sx={{display:'flex', flexWrap:'nowrap', flexDirection:'column', alignItems:"flex-start", paddingTop:"20px", gap:"10px"}}>
    <Button 
        startIcon={<HomeIcon/>} 
        onClick={()=>navigate('/')}
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

    {auth?.user?.isTeacher ? 
    <Button 
     
    startIcon={<SpaceDashboardIcon/>} 
    onClick={()=>navigate('/portal')}
    size='medium'
            sx={{paddingLeft:"25px", 
        width:"200px", 
        display:"flex",
        justifyContent:"flex-start",
        borderTopRightRadius:"20px",
        borderBottomRightRadius:"20px",
        }}>
        Portal
    </Button>
      :
      <Button 
       
      startIcon={<SpaceDashboardIcon/>} 
      onClick={()=>navigate('/dashboard')}
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
        Dashboard
      </Button>} 
      <Divider />
      <Button 
      startIcon={<LibraryBooksIcon/>} 
      onClick={()=>navigate('/catalog')}
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
      onClick={()=>navigate('/account-settings')}
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
      onClick={auth.logout} component={Link} to={`/`}
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