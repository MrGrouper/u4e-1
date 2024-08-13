import { useEffect } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import SubjectImage from "../components/subject/SubjectImage";
import SubjectVideos from "../components/subject/SubjectVideos";
import SubjectInfo from "../components/subject/SubjectInfo";
import { getSubject } from "../helpers/api-communicator";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../components/shared/LoadingPage";
import ErrorWithPage from "../components/shared/ErrorWithPage";
import Curriculum from "../components/subject/Curriculum";

const SubjectUpdate = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  const { isPending, isError, data: subject, error } = useQuery({
    queryKey :["subject", id], 
    queryFn: () => getSubject(id)})


  if (isPending) {
    return <LoadingPage/>
  }

  if (isError) {
    console.log(error)
    return <ErrorWithPage/>
  }


  if (subject) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        flexWrap = "nowrap"
        alignItems="center"
        minHeight="0px"
        gap="20px"
        sx={{
          overflowY: "auto",
          pt: 3,
          pb: 3,
          pl: 1,
          pr: 1,
          flex: "1 1 auto",
        
        }}
      >
        <SubjectInfo subject={subject} />
        <SubjectImage subject={subject} />
        <SubjectVideos subject={subject} />
        <Curriculum subject={subject} />
      </Box>
    );
  } else {
    return <></>;
  }
};

export default SubjectUpdate;
