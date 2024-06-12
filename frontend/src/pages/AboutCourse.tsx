import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubject, getUser } from "../helpers/api-communicator";
import { 
    sendCreateClassroomRequest,
    sendInitialChatRequest, 
  } from "../helpers/api-communicator";
//@ts-expect-error not used
import { Box, Avatar, Typography, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AboutCourse = () => {
    const { id } = useParams()
    const auth = useAuth();
    const navigate = useNavigate()

    const [subject, setSubject] = useState(null)
    const [teacher, setTeacher] = useState(null)

    useEffect(() => {
    const handleData = async () => {
        try {
        const subject = await getSubject(id)
        setSubject(subject)
        const teacher = await getUser(subject.teacherId)
        setTeacher(teacher)
      }
        catch (error) {
          console.log(error)
      }
    }
        handleData()
  
  }, []);

  const handleEnroll= async (e)=>{
    e.preventDefault()
    if (auth?.isLoggedIn && auth.user && auth.user.isTeacher == false) {
    const req = {
        senderId: auth.user._id,
        receiverId: subject.teacherId,
        subjectId: subject.id
    }
        try{
      toast.loading('enrolling...')
      const data = await sendCreateClassroomRequest(req)
      await sendInitialChatRequest(data, req.senderId)
      toast.dismiss()
      navigate(`/classroom/${data.id}`)

    } catch {
      console.log("cannot create classroom")
      toast.error('could not generate response')
  
  }}
  else{
    return navigate("/signup");
  }
}

  if(subject && teacher){
  return (
    <Box 
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
     >
        <Box width={"100%"} display="flex" flex={1} justifyContent={"center"} alignItems={"center"}>
            <Box 
                padding={3} 
                mt={3} 
                display={{ md: "flex", sm: "none", xs: "none" }}
                width={'50%'}
                >
                <img src={subject.imageUrl} alt="subject.imageUrl" style = {{maxWidth: "100%", maxHeight: "100%", borderRadius: "10px", objectFit:"cover"}} />
            </Box>
            <Box
            padding={3} 
            mt={3} 
            width={{sm:'100%'}}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={"center"}
            alignItems={'center'}
            gap={"20px"}
            >
                <Typography align="center" variant="h1">
                    {subject.name}
                </Typography>
                <Typography variant="h5">
                    Instructor:
                </Typography>
                <Box
                sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap:"20px"
                }}
                >
                    <Avatar
                    src= {teacher.avatarUrl }
                    alt={`${teacher.firstname} ${teacher.lastname}`}
                    sx={{width: 60, height: 60}}
                    />
                    <Typography variant="h4">
                        {teacher.firstname} {teacher.lastname}
                 </Typography>
                </Box>
                <Button size="medium" variant="contained" color="secondary"
                        onClick={handleEnroll}
                     >
                        Enroll
                    </Button>
            </Box>
      </Box>
      <Box
        padding={3} 
        display={'flex'}
        flexDirection={'column'}
        // justifyContent={"center"}
        // alignItems={'center'}
        gap={"20px"}
        >
            <Typography variant="h5">
                Course Description
            </Typography>
            <Typography variant="h6">
                {subject.courseDescription}
            </Typography>
        </Box>
      </Box>
  
  )
  }
  else{return null}
}

export default AboutCourse
