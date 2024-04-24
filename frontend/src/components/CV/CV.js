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
    <Box className="CV-uploaded-file" sx={{display:"flex", justifyContent: "space-between" }}>
      <Typography  component="div" onClick={handleClick} >
        {title} {id}
      </Typography>
    </Box>
  );
};

export default CV;
