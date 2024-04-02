import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import background from "../../assets/images/logo.jpg";
import logo from "../../assets/images/logocty.jpg";
import "./CO.css";

const CO = () => {
  return (
    <Card className="card-CO" sx={{   borderRadius: "20px", width: "100%" }}>
    <img className="logo-CO" src={logo} />
    <CardActionArea>
      <CardMedia
        component="img"
        height="200"
        image={background}
        alt="green iguana"
      />
      <CardContent sx={{ ml: 30, pb: 4 }}>
        <Typography gutterBottom variant="h4" component="div">
          Tập đoàn Hoa sen
        </Typography>
        <Typography component="div" sx={{ display: "flex" ,gap:10}}>
          <Typography component="div">
            https://careers.lgcnsvn.com/
          </Typography>
          <Typography component="div">100-499 nhân viên</Typography>
          <Typography component="div">12 bài đăng tuyển dụng</Typography>
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

export default CO