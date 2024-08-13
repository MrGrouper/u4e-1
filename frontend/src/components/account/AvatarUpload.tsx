import { useState, useRef, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  Badge,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import CustomAvatar from "../shared/CustomAvatar";
import { useMutation } from "@tanstack/react-query";

const AvatarUpload = () => {
  const auth = useAuth();

  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentUser(auth.user);
      if (auth.user && auth.user.avatarUrl) {
        setUrl(auth.user.avatarUrl);
      }
    }
  }, []);

  const imageUrlMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.log(error);
      toast.error("could not upload image");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const data = new FormData();
      data.append("image", image);
      try {
        const imageUrl = await imageUrlMutation.mutateAsync(data);
        const newUserInfo = { ...currentUser, avatarUrl: imageUrl };
        const updatedUser = await auth?.userUpdate(newUserInfo);
        setCurrentUser(updatedUser);
        toast.success("Image changed!");
      } catch (error) {
        console.log(error);
        toast.error("Could not upload image");
      }
    } else {
      toast.error("Please select an image");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        margin: "0 auto",
        padding: "1rem",
        boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
        borderRadius: "10px",
        maxWidth: "600px",
        width: "90%",
        gap:"20px"
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h5">Update profile avatar</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Badge
          badgeContent={"+"}
          color="primary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          onClick={() => fileInput.current.click()}
          sx={{
            "& .MuiBadge-badge": {
              color: "secondary",
              fontSize: "30px",
              fontWeight: "200",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
            },
            ":hover": {
              cursor: "pointer",
            },
          }}
          overlap="circular"
        >
          <CustomAvatar
            size={100}
            firstName={auth.user?.firstname}
            lastName={auth.user?.lastname}
            avatarUrl={url}
          ></CustomAvatar>
        </Badge>
      </Box>

      <input
        type="file"
        accept=".jpeg, .png, .svg, .jpg, .gif"
        multiple={false}
        onChange={handleChange}
        ref={fileInput}
        style={{ display: "none" }}
      />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        disabled={
          auth?.userUpdatePending || imageUrlMutation.isPending ? true : false
        }
      >
        {auth?.userUpdatePending || imageUrlMutation.isPending ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          "Use Avatar"
        )}
      </Button>
    </form>
    //   </Box>
  );
};

export default AvatarUpload;
