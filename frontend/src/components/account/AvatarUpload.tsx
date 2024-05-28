import { useState, useRef, useEffect } from "react";

import { Box, Typography, Button, Avatar, Badge } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../helpers/api-communicator";
import { updateUser } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";

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
        const updatedUser = await updateUser(newUserInfo)
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

    //   <Box
    //     display={"flex"}
    //     flex={{ xs: 1, md: 0.5 }}
    //     justifyContent={"center"}
    //     alignItems={"center"}
    //     padding={2}
    //     ml={"auto"}
    //     mt={16}
    //   >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
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
          {currentUser && currentUser.avatarUrl  ? 
          <Typography>Change Avatar</Typography> 
          :
          <Typography>Add Avatar</Typography>
          }
        </Box>
        <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        >
          <Badge 
          badgeContent={'+'}
          color="secondary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClick = {()=> fileInput.current.click()}
          sx={{
            "& .MuiBadge-badge": {
              color: "#001e1d",
              backgroundColor: "#fffffe",
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
          <Avatar
          sx={{
            height: '100px', 
            width: '100px',
          }}
          src = {url}
          ></Avatar>
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
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#e8e4e6",
                color: '#001e1d',
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              Use Image
            </Button>
          
        </form>
    //   </Box>

  );
};

export default AvatarUpload;
