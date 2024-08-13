import { useState, useRef } from "react";

import { Box, Typography, Button, CircularProgress, Avatar, Badge } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {
  sendCreateSubject,
  uploadNewSubject
} from "../../helpers/api-communicator";
// import { updateUser } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import CustomizedInput from "../shared/CustomizedInput";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";


const CreateSubject = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const [curriculum, setCurriculum] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState(null);


  const uploadMutation = useMutation({
    mutationFn: uploadNewSubject,
    onError: (error) => {
      console.log(error);
      toast.error(`could not upload files`);
    },
  });

  const createSubjectMutation = useMutation({
    mutationFn: sendCreateSubject,
    onError: (error) => {
      console.log(error);
      toast.error(`could not upload curriculum`);
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subjectName = data.get("subjectname") as string;
    const courseDescription = data.get("courseDescription") as string;
    try{
      if (!image) {
        toast.error("No image selected")
        throw new Error("No image selected")
      }
      if (!curriculum){
        toast.error("No curriculum selected")
        throw new Error("No curriculum selected")
      }
      data.append("image", image)
      data.append("curriculum", curriculum)
      const resData = await uploadMutation.mutateAsync(data)

    const newSubject = {
      name: subjectName,
      teacherId: auth.user._id,
      curriculum: resData.curriculumUrl,
      vectorStoreFileId: resData.vectorStoreFileId,
      courseDescription: courseDescription,
      imageUrl: resData.imageUrl,
      videos: null,
      classrooms: null
    };
    createSubjectMutation.mutate(newSubject ,
      {
        onSuccess: (createSubjectRes) => {
          toast.success(`Curriculum uploaded`);
          navigate(`/${createSubjectRes.id}/onboard`, {state: createSubjectRes});
        },
      }
    );
    }
    catch(error) {
      console.log(error)
    }
  };


  const handleChange = (e) => {
    e.preventDefault();
    setCurriculum(e.target.files[0]);
  };
  const handleImageChange = (e) => {
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
    }}
    >
      <Box
      sx={{
        alignContent: "center",
        paddingBottom: '10px'
      
      }}
      >
      <Typography variant="h4">Add New Course</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Badge
          badgeContent={"+"}
          color="secondary"
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
          <Avatar
            variant="rounded"
            sx={{
              height: "135px",
              width: "240px",
            }}
            src={url}
          ></Avatar>
        </Badge>
      </Box>
      <input
        type="file"
        accept=".jpeg, .png, .svg, .jpg, .gif"
        multiple={false}
        onChange={handleImageChange}
        ref={fileInput}
        style={{ display: "none" }}
      />
      <CustomizedInput type="text" name="subjectname" label="Course Name" />

      <TextField
      margin="normal"
      name="courseDescription"
      label="Course Description"
      type="text"
      multiline
      rows={5}
      InputProps={{
        style: {
          borderRadius: 10,
          color: "primary",
        },
      }}
    />
    <Box
    sx={{
      mt: '8px',
      border: '1px solid white',
      borderRadius: '10px',
      padding: "16px"

    }}>
    <Typography variant="h5">Add Curriculum File</Typography>
      <input
        type="file"
        accept=".pdf, .doc, .docx"
        multiple={false}
        onChange={handleChange}
      />
      </Box>
    {uploadMutation.isPending ||
              createSubjectMutation.isPending ?
              <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                borderRadius: 2,
              }}
            >
                          <CircularProgress
                  size={24}
                  sx={{
                    color: "secondary.main",
                  }}
                />
            </Button>

            :
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          borderRadius: 2,
        }}
      >
        Create Course
      </Button>
}
    </form>

  );
};

export default CreateSubject;
