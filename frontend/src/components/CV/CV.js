import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CV.css";

const CV = () => {
  return (
    <Box className="CV-uploaded-file" sx={{display:"flex", justifyContent: "space-between" }}>
      <Typography  component="div" >
      CV-Intern-BackEnd.PDF 
      </Typography>
    <DeleteIcon sx={{ float: "right" }}></DeleteIcon>
    </Box>
  );
};

export default CV;
