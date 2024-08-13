import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Types } from "mongoose";
// import { useAuth } from "../../context/AuthContext";
// import { 
//     sendCreateClassroomRequest,
//     sendInitialChatRequest, 
//   } from "../../helpers/api-communicator";
// import { toast } from "react-hot-toast";

type Subject = {
  id: Types.ObjectId
  name: string;
  teacherId: Types.ObjectId | string;
  curriculum: string;
  vectorStoreFileId: string;
  courseDescription: string;
  imageUrl: string;
  videos: string[];
  classrooms: Types.ObjectId[];
};

const CourseCard = (props: { subject: Subject, classroomId }) => {


  const truncate = (str) => {
    return str.length > 110 ? str.substring(0, 107) + "..." : str;
  }

  // const handleEnroll = async (e) => {
  //   e.preventDefault();
  //   const req = {
  //     senderId: auth.user._id,
  //     receiverId: props.subject.teacherId,
  //     subjectId: props.subject.id
  //   };
  //   try {
  //     toast.loading('enrolling...');
  //     const data = await sendCreateClassroomRequest(req);
  //     await sendInitialChatRequest(data, req.senderId);
  //     props.onEnroll();
  //     toast.dismiss();
  //   } catch {
  //     console.log("cannot create classroom");
  //     toast.error('could not generate response');
  //   }
  // }

  return (
    <Card
      sx={{ width: 345, backgroundColor: "#abd1c6", borderRadius: "15px" }}
    >
      <CardMedia
        component="img"
        alt="subject image"
        height="140"
        image={props.subject.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.subject.name}
        </Typography>
        <Typography variant="body2">
        {props.subject.courseDescription && truncate(props.subject.courseDescription)}
        </Typography>
      </CardContent>
            <CardActions color="#004643">
              <Button 
                component={Link} 
                to={`/classroom/${props.classroomId}`}
                size="small" 
                variant="outlined"
              >
                Go to Classroom
              </Button>
            </CardActions>
    </Card>
  );
};

export default CourseCard;
