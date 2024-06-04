import { useEffect, useState } from "react";
import { getUser, getSubject } from "../../helpers/api-communicator";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Avatar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

//portal
//active class cards
//your subjects - course cards - user.subjects

//subject name
//user.avatar
//user.name
//classid - yoursubjects.classrooms

const ActiveClassCard = (props: { teacherId; classroom }) => {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const studentId = props.classroom.members.filter(
      (member) => member !== props.teacherId
    );
    if (studentId.length !== 1) {
      console.log("student does not exist");
    } else {
      getUser(studentId[0]).then((data) => {
        setUser(data);
      });
      getSubject(props.classroom.subjectId).then((data) => {
        console.log(data);
        setSubject(data);
      });
    }
  }, []);

  if (user && subject) {
    return (
      <Card
        sx={{ width: 345, backgroundColor: "#abd1c6", borderRadius: "15px" }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {subject.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            with
          </Typography>
          <Avatar
            alt={`${user.firstname} ${user.lastname}`}
            src={user.avatarUrl}
            sx={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {`${user.firstname} ${user.lastname}`}
          </Typography>
        </CardContent>
        <CardActions color="#004643" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
      <Button 
      component={Link} 
      to= {`/classroom/${props.classroom.id}`}
      size="small" 
      variant="outlined"
      sx={{color: "black"}}
      >
          Go to Classroom
        </Button>
        
        </CardActions>
      </Card>
    );
  }
};

export default ActiveClassCard;
