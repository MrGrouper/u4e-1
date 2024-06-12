import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
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
  }, [auth, props.subject]);

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
    setVideoId(videoId.filter((o, i) => i !== index));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        padding: "30px",
        boxShadow: "0px 0.25px 5px 0px rgba(0,0,0,0.36)",
        borderRadius: "10px",
        maxWidth: "100%",
        width: "100%",
        '@media (min-width: 600px)': {
          maxWidth: "400px",
        },
      }}
    >
      <Typography paddingBottom={"5px"} variant="h5" textAlign={"center"}>
        Add Youtube Videos To Your Class
      </Typography>
      <Typography variant="caption" textAlign={"center"} paddingBottom={"10px"}>
        The video ID will be located in the URL of the video page, right after
        the v= URL parameter. In this case, the URL of the video is:
        https://www.youtube.com/watch?v=aqz-KE-bpKQ. Therefore, the ID of the
        video is aqz-KE-bpKQ
      </Typography>
      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
          <TextField
            onChange={(e) => setFormInput(e.target.value)}
            margin="normal"
            fullWidth
            name="youtubeUrl"
            label="Paste your Youtube Video ID here"
            type="text"
            value={formInput}
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
          />
          <IconButton aria-label="add" type="submit">
            <AddCircleIcon />
          </IconButton>
        </Box>
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
            key={index}
            sx={{
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              gap: "10px",
              borderWidth: "1px",
              borderColor: "white",
              borderRadius: "5px",
            }}
          >
            <iframe
              width="84"
              height="63"
              src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
            <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button
        onClick={handleSubmit}
        color="secondary"
        variant="contained"
        sx={{
          px: 2,
          py: 1,
          mt: 2,
          width: "100%",
          borderRadius: 2,
        }}
      >
        Update Videos
      </Button>
    </Box>
  );
};

export default SubjectVideos;
