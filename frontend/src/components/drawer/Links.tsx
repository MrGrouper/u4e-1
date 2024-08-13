import { Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Links = () => {
  const navigate = useNavigate()
  return (
    <Box
    sx={{display: "flex", flexWrap:"nowrap", justifyContent:"flex-start", gap:"25px"}}
    >
      <Button 
        onClick={()=>navigate('/catalog')}
        size='medium'
        sx={{
        borderRadius:"20px",
        }}
        >
            Course Catalog
    </Button>
    <Button 
        onClick={()=>navigate('/about')}
        size='medium'
        sx={{
        borderRadius:"20px",
        }}
        >
            About
    </Button>
    <Button 
        onClick={()=>navigate('/contribute')}
        size='medium'
        sx={{
        borderRadius:"20px",
        }}
        >
            Contribute
    </Button>
        </Box>
  )
}
