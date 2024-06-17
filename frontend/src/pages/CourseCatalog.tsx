// import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { getAllSubjects } from "../helpers/api-communicator";
import CatalogCard from "../components/subject/CatalogCard";
import { useQuery } from "@tanstack/react-query"
import { getAllSubjects } from "../helpers/api-communicator";
import LoadingPage from "../components/shared/LoadingPage"
import ErrorWithPage from "../components/shared/ErrorWithPage";

const CourseCatalog = () => {

    const { isPending, isError, data, error } = useQuery({queryKey :["subjects"], queryFn: getAllSubjects})
  
    if (isPending) {
      return <LoadingPage/>
    }
  
    if (isError) {
      console.log(error)
      return <ErrorWithPage/>
    }

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
        {data.map((subject) => (
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
