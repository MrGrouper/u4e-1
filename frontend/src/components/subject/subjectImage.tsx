import { useState, useRef, useEffect } from "react";

import { Box, Typography, Button, Avatar, Badge } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { uploadImage } from "../../helpers/api-communicator";
import { updateSubject } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { Types } from 'mongoose';

type Subject = {
    name: string,
    teacherId: Types.ObjectId | string,
    curriculum: string,
    vectorStoreFileId: string, 
    courseDescription: string,
    imageUrl: string,
    videos:string[]
  }

const SubjectImage = (props: {subject: Subject}) => {
  const auth = useAuth();

  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null)
  const fileInput = useRef(null)


  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
        setCurrentSubject(props.subject)
        if (props.subject.imageUrl) {
          setUrl(props.subject.imageUrl)
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
        const newSubjectInfo = {...props.subject, imageUrl: imageUrl}
        const updatedSubject = await updateSubject(newSubjectInfo)
        setCurrentSubject(updatedSubject)
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
          {currentSubject && currentSubject.imageUrl  ? 
          <Typography>Change Image</Typography> 
          :
          <Typography>Add Image</Typography>
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
          variant="rounded"
          sx={{
            height: '135px', 
            width: '240px',
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

export default SubjectImage;