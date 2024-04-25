import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import PaidIcon from "@mui/icons-material/Paid";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PlaceIcon from "@mui/icons-material/Place";
import LogoCty from "../../assets/images/logocty.jpg";
import "./COjob.css";

const COjob = ({data}) => {


  const timecalculator =()=>{
    const currentDate = new Date(); // Lấy ngày và giờ hiện tại
    const difference = (currentDate - new Date(data.createdAt))/1000; // Tính thời gian chênh lệch
    switch (true) {
      case difference <60:
        return " Vừa xong";
      case difference<3600:
        return Math.floor(difference/60) +" phút trước";
      case difference<86400:
        return Math.floor(difference/3600) +" giờ trước";
      case difference<604800:
        return Math.floor(difference/86400) +" ngày trước";
      case difference<4579200:
        return Math.floor(difference/604800) +" tuần trước";
        default:
          return "Không xác định";
    }
  }
  
  return (
    <Box sx={{ minWidth: 275, mr: 2 }}>
      <Card variant="outlined" sx={{ borderRadius: "16px" }}>
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {timecalculator()}
            </Typography>
            <Box display="flex" alignItems="center">
              <img className="COjob-logo" src={data.CO.logo}></img>
              <Box sx={{ ml: 3 }}>
                <Typography variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography color="text.secondary">{data.CO.name}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <PaidIcon></PaidIcon>
              <Typography variant="body2" sx={{ ml: 1, fontSize: 25 }}>
              {data.salaryfrom} - {data.salaryto} USD
              </Typography>
            </Box>
            <Box sx={{display:"flex", alignItems:"center" , justifyContent:"space-between", mt: 1 }}>
              <Box sx={{display:"flex" ,alignItems:"center" }}>
                <WorkOutlineIcon></WorkOutlineIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                {data.form}
                </Typography>
                <PlaceIcon sx={{ ml: 5 }}></PlaceIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                {data.address.city}
                </Typography>
              </Box>
              <Button variant="contained" color="success">
                Ứng tuyển
              </Button>
              <Button variant="contained" color="success">
                Cập nhật
              </Button>
              <Button variant="contained" color="success">
                Duyệt hồ sơ
              </Button>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}></Box>
            <Box sx={{ mt: 1 }}>
              {data.tag.skill.map((skill, index) => (
                <Chip
                  sx={{ m: 0.5 }}
                  key={index}
                  label={skill}
                  variant="outlined"
                />
              ))}
            </Box>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default COjob;
