//@ts-expect-error daf
import { Box, Typography, Button } from "@mui/material";
//@ts-expect-error daf
import Dialog from '@mui/material/Dialog';
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/shared/Avatar";



const AccountSettings = () => {

    const auth = useAuth();
    const currentUser = auth.user
    console.log('currentUser', currentUser)

    const handleSubmit = () =>{
      console.log('hi')
    }
  return (
    <Box
    mt = {"65px"}>
          <form
          onSubmit={handleSubmit}>
    <Button
    type="submit"
    sx={{
      px: 2,
      py: 1,
      mt: 2,
      width: "400px",
      borderRadius: 2,
      bgcolor: "#00fffc",
      ":hover": {
        bgcolor: "white",
        color: "black",
      },
    }}
  >
    Update Avatar
  </Button>
  <Avatar
  currentUser={currentUser}
  />
  </form>
  </Box>
  )
}

export default AccountSettings