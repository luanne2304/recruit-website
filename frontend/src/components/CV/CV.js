import React from "react";
import Box from "@mui/material/Box";
import "./CV.css";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; // Icon PDF
import DeleteIcon from "@mui/icons-material/Delete"; // Icon Xóa
import CVService from "../../services/CVService";
import { useAuth }  from '../../utils/authUtils';

const CV = ({title,link,id ,owner}) => {
  const { accessToken } = useAuth()

  const handleClickCV = (event) => {
    event.preventDefault();
    window.open(link, "_blank");
  };
  const handleDelCV =async () => {
    await CVService.del(id,accessToken) 
  }
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3, borderRadius: 2, maxWidth: 300 }}>
      {/* Icon PDF */}
      <PictureAsPdfIcon sx={{ fontSize: 40, color: "red", mr: 2 }} />
      
      {/* Title của File */}
      <Typography sx={{ flexGrow: 1, fontWeight: 500 }} onClick={handleClickCV} >{title}</Typography>

      {/* Icon Xóa */}
      {owner===true &&
            <IconButton  sx={{ color: "gray", "&:hover": { color: "red" } } } onClick={handleDelCV}>
            <DeleteIcon />
          </IconButton>}
    </Card>
  );
};

export default CV;
