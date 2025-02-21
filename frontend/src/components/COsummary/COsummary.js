import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import thumbnail from "../../assets/images/logo.jpg";
import { CardActionArea} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./COsummary.css";

const COsummary = ({ CO }) => {

  const navigate = useNavigate();

  const handleClick=()=>{
    navigate(`/home/DetailCO/${CO._id}`)
  }

  return (
    <Card  className="card-COsummary" sx={{ width: "100%" }}>
      <img src={CO.logo} className="logo-COsummary" />
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="160"
          image={CO.coverimg ? CO.coverimg : thumbnail}
          alt="green iguana"
        />
        <CardContent sx={{ mt: 4 }}>
          <Typography gutterBottom sx={{fontSize: "1.1rem", fontWeight: "bold"}} component="div">
            {CO.name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: "0.8rem",
              height:"6em",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4, // Số dòng tối đa trước khi tràn
              overflow: "hidden",
              width: "100%", // Đảm bảo văn bản không tràn ra khỏi phần tử cha
            }}
          >
            {CO.des}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default COsummary;
