import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Types } from "mongoose";

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

const CatalogCard = (props: { subject: Subject}) => {


  const truncate = (str) => {
    return str.length > 110 ? str.substring(0, 107) + "..." : str;
  }

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
      {/* {(auth?.isLoggedIn && auth.user) ? 
        auth.user.isTeacher ? (
          <CardActions color="#004643">
            <Button 
              component={Link} 
              to={`/${props.subject.id}/update`}
              size="small" 
              variant="outlined" >
              Edit Course
            </Button>
          </CardActions>
        ) : (
          props.isEnrolled ? (
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
          ) : (
            <CardActions color="#004643">
              <Button size="small" variant="outlined"
                component={Link} 
                to={`/course/${props.subject.id}`}
              >
                Learn More
              </Button>
              <Button size="small" variant="outlined"
                onClick={handleEnroll}
              >
                Enroll
              </Button>
            </CardActions>
          )
        ) : ( */}
        <CardActions color="#004643" sx={{alignSelf: "flex-end"}}>
        <Button size="small" variant="outlined"
                component={Link} 
                to={`/course/${props.subject.id}`}
              >
                Learn More
              </Button>
        </CardActions>
      {/* )} */}
    </Card>
  );
};

export default CatalogCard;
