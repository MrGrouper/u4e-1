import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import { getAllSubjects } from "../helpers/api-communicator";
import CatalogCard from "../components/subject/CatalogCard";

const CourseCatalog = () => {
  // const auth = useAuth()
  // const navigate = useNavigate()

  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    getAllSubjects().then((data) => {
      setAvailableSubjects(data);
    });
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} padding={"20px"}>
      <Typography
        variant="h4"
        sx={{
          paddingBottom: "20px",
        }}
      >
        Available Courses
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          paddingBottom: "25px",
        }}
      >
        {availableSubjects.map((subject) => (
          <CatalogCard
            key={subject.id}
            subject={subject}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CourseCatalog;
