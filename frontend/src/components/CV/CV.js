import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./CV.css";

const CV = ({title,link,id}) => {

  const handleClick = (event) => {
    event.preventDefault();
    window.open(link, "_blank");
  };
  return (
    <Box className="CV-uploaded-file">
      <Typography  component="div" onClick={handleClick} >
        {"Tên file: "+title}
      </Typography>
    </Box>
  );
};

export default CV;
