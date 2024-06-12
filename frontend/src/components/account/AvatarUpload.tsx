import { useState, useRef, useEffect } from "react";

import { Box, Typography, Button, Badge } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import CustomAvatar from "../shared/CustomAvatar";

const AvatarUpload = () => {
  const auth = useAuth();

  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)
  const fileInput = useRef(null)


  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
        setCurrentUser(auth.user)
        if (auth.user && auth.user.avatarUrl) {
          setUrl(auth.user.avatarUrl)
        }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (image) {
      const data = new FormData();
      data.append("image", image);
      try {
        const imageUrl = await uploadImage(data);
        const newUserInfo = {...currentUser, avatarUrl: imageUrl}
        const updatedUser = await auth.userUpdate(newUserInfo)
        setCurrentUser(updatedUser)
        toast.success('Image changed!')
      } catch (error) {
        console.log(error);
        toast.error('Could not upload image')
      }
    } else {
      toast.error('Please select an image')
    }
  };

  const handleChange = (e) => {
    e.preventDefault()
    setImage(e.target.files[0])
    setUrl(URL.createObjectURL(e.target.files[0]))
  }

  return (

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            margin: "auto",
            padding: "30px",
            boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
            borderRadius: "10px",
            border: "none",
          }}
        >
          
          <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingBottom={'15px'}
          >

          <Typography variant="h5">Update profile avatar</Typography>
  
        </Box>
        <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        >
          <Badge 
          badgeContent={"+"}
          color="primary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClick = {()=> fileInput.current.click()}
          sx={{
            "& .MuiBadge-badge": {
              color: "secondary",
              fontSize: '30px',
              fontWeight: '200',
              height: '30px',
              width: '30px',
              borderRadius: '50%'
            },
            ":hover": {
              cursor: 'pointer'
            },
          }}
          overlap="circular"
        >
          <CustomAvatar
          size={100}
          firstName={auth.user.firstname}
          lastName={auth.user.lastname}
          avatarUrl = {url}
          ></CustomAvatar>
          </Badge>
        </Box>
       
              <input
                type="file"
                accept=".jpeg, .png, .svg, .jpg, .gif"
                multiple={false}
                onChange={handleChange}
                ref = {fileInput}
                style={{ display: 'none'}}
              />
          

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
              }}
            >
              Use avatar
            </Button>
          
        </form>
    //   </Box>

  );
};

export default AvatarUpload;
