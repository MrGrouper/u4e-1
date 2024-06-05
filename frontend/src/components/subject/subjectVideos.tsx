import { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  //   Avatar,
  //   Badge,
  IconButton,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../context/AuthContext";
import { updateSubject } from "../../helpers/api-communicator";
import { toast } from "react-hot-toast";
import { Types } from "mongoose";

type Subject = {
  name: string,
  teacherId: Types.ObjectId | string,
  curriculum: string,
  vectorStoreFileId: string, 
  courseDescription: string,
  imageUrl: string,
  videos:string[], 
  classrooms: Types.ObjectId[]
}

const SubjectVideos = (props: { subject: Subject }) => {
  const auth = useAuth();

  const [videoId, setVideoId] = useState([]);
  //@ts-expect-error blah
  const [currentSubject, setCurrentSubject] = useState(null);
  const [formInput, setFormInput] = useState("");

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      setCurrentSubject(props.subject);
      if (props.subject.videos) {
        setVideoId(props.subject.videos);
      }
    }
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const videoIdInput = formInput as string;
    const newVideoId = videoId.concat(videoIdInput);
    console.log(newVideoId);
    setVideoId(newVideoId);
    setFormInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSubjectInfo = { ...props.subject, videos: videoId };
      await updateSubject(newSubjectInfo);
      toast.success("Videos updated!");
    } catch (error) {
      console.log(error);
      toast.error("Could not update videos");
    }
  };

  const handleDelete = (index) => {
    //@ts-expect-error unused
    setVideoId(videoId.filter((o,i) => i !== index));
};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        padding: "30px",
        boxShadow: "10px 10px 20px #000",
        borderRadius: "10px",
        border: "none",
        width: "600px"
      }}
    >
      <Typography variant="h4" textAlign={"center"}>Add Videos To Your Class</Typography>
      <Typography>
        The video ID will be located in the URL of the video page, right after
        the v= URL parameter. In this case, the URL of the video is:
        https://www.youtube.com/watch?v=aqz-KE-bpKQ. Therefore, the ID of the
        video is aqz-KE-bpKQ{" "}
      </Typography>
      <form onSubmit={handleAdd}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignContent: "center",
        gap: "10px"
      }}
      >
        <TextField
          onChange={(e) => setFormInput(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { color: "white" } }}
          type="text"
          name="youtubeUrl"
          label="Paste your Youtube Video ID here"
          value={formInput}
          InputProps={{
            style: {
              width: "400px",
              borderRadius: 10,
              fontSize: 12,
              color: "white",
            },
          }}
        />
        <IconButton aria-label="add" type="submit" >
          <AddCircleIcon 
          sx={{
            color:"white"
          }}
          />
        </IconButton>
      </form>
      <Box
      sx={{
        padding: "5px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        gap: "10px",
        flexWrap: "wrap",

      }}
      >
        {videoId.map((videoId, index) => (
          <Box
          sx={{
            padding: "5px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "10px",
            borderWidth: "1px",
            borderColor: "white",
            borderRadius: "5px",
    
          }}>
            <iframe
              key={index}
              width="84"
              height="63"
              src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
            <IconButton aria-label="delete" key={index} onClick={() => handleDelete(index)}>
              <DeleteIcon 
                 sx={{
                    color:"white"
                  }}
              />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button
        onClick={handleSubmit}
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          width: "400px",
          borderRadius: 2,
          bgcolor: "#e8e4e6",
          color: "#001e1d",
          ":hover": {
            bgcolor: "white",
            color: "black",
          },
        }}
      >
        Update Videos
      </Button>
    </Box>
  );
};

export default SubjectVideos;
