import {useState} from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MailIcon from '@mui/icons-material/Mail';
import Toolbar from "@mui/material/Toolbar";
import UserHeader from "../header/UserHeader";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
// import { getSubject, getUserClassrooms } from "../../helpers/api-communicator";
// import SubjectIcon from '@mui/icons-material/Subject';

const drawerWidth = 240;

const UserDrawer = (props: { auth }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
//   const [classrooms, setClassrooms] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       const data = await Promise.all(
//         props.auth.user.subjects.map(async (subjectId) => {
//           const subject = await getSubject(subjectId);
//           return subject;
//         })
//       );
//       setSubjects(data);
//     };

//     if (props.auth?.isLoggedIn && !props.auth.user.isTeacher) {
//       getUserClassrooms(props.auth.user._id).then((data) => {
//         setClassrooms(data);
//       });
//     }

//       if (props.auth?.isLoggedIn && props.auth.user.isTeacher) {
//       fetchSubjects();
//     }
//   }, []);

//   const subjectMap = subjects.reduce((map, subject) => {
//     map[subject.id] = subject;
//     return map;
//   }, {});

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>

              <ListItemButton onClick={() => navigate("/account-settings")}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          {props.auth?.user?.isTeacher ? (
            <>
              <ListItemButton onClick={() => navigate("/portal")}>
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
                <ListItemText primary="Portal" />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton onClick={() => navigate("/dashboard")}>
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </>
          )}
        </ListItem>
      </List>
      <Divider />
      {/* <List>
      {classrooms.map((classroom) => {
              const subject = subjectMap[classroom.subjectId];
              return subject ?(
          <ListItem key={classroom} disablePadding>
            <ListItemButton
            onClick = {()=>navigate(`/classroom/${classroom._id}`)}
            >
              <ListItemIcon>
                <SubjectIcon /> 
              </ListItemIcon>
              <ListItemText primary={subject.name} />
            </ListItemButton>
          </ListItem>
              ) : null
      })}
      </List> */}
    </div>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "var(--background)" }}>
      <CssBaseline />
      <UserHeader
        auth={props.auth}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: "#001e1d",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              backgroundColor: "#001e1d",
              color: "#e8e4e6",
            },
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              backgroundColor: "#001e1d",
              color: "#e8e4e6",
            },
          }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default UserDrawer;
