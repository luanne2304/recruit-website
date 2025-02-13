import React from 'react'
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import { CardActionArea } from "@mui/material";
import background from "../../assets/images/logo.jpg";
import logocty from "../../assets/images/logocty.jpg";
import "./CO.css";

const CO = ({data,owner}) => {
  
    const navigate = useNavigate();
    const handleClick=()=>{
      navigate(`/home/EditMyCO/${data._id}`)
    }
  return (
    <Card className="card-CO" sx={{   borderRadius: "20px", width: "100%" }}>
    <img className="logo-CO" src={data? data.logo : logocty} />
    <CardActionArea>
      <CardMedia
        component="img"
        height="200"
        image={background}
        alt="green iguana"
      />
      <CardContent sx={{ ml: 30, pb: 4 }}>
        <Typography gutterBottom variant="h4" component="div">
          {data? data.name: "Nan"}
          {owner &&     <BorderColorTwoToneIcon onClick={handleClick}></BorderColorTwoToneIcon>}
        
        </Typography>
        <Typography component="div" sx={{ display: "flex" ,gap:10}}>
          <Typography component="div">
          {data? data.link: "Nan"}
          </Typography>
          <Typography component="div">{data? data.scalefrom +" - "+ data.scaleto +" nhân viên":"Nan"}</Typography>
          <Typography component="div">Nan bài đăng tuyển dụng</Typography>
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

export default CO