import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanTwoToneIcon from '@mui/icons-material/LanTwoTone';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import PlaceIcon from "@mui/icons-material/Place";
import LogoCty from "../../assets/images/logocty.jpg";
import { useNavigate } from "react-router-dom";
import "./JobSummary.css";


export default function JobSummary({job}) {

  const navigate = useNavigate();

    const timecalculator =()=>{
      const currentDate = new Date(); // Lấy ngày và giờ hiện tại
      const difference = (currentDate - new Date(job.createdAt))/1000; // Tính thời gian chênh lệch
      switch (true) {
        case difference <60:
          return " Vừa xong";
        case difference<3600:
          return Math.floor(difference/60) +" phút trước";
        case difference<86400:
          return Math.floor(difference/3600) +" giờ trước";
        case difference<604800:
          return Math.floor(difference/86400) +" ngày trước";
          default:
        return Math.floor(difference / 604800) + " tuần trước";
      }
    }

    const handleClick = () => {
      navigate(`/home/DetailJob/${job._id}`); // Replace with your desired URL
    };
    

  return (
    // <div onClick={handleClickSwift(key)}>
    <Box sx={{ minWidth: 275  }}  >
      <Card variant="outlined" style={{ position: 'relative',borderRadius: 16 }}>
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {timecalculator()}
            </Typography>
            <Typography component="div" sx={{fontSize: "1.27rem", fontWeight: "bold"}} onClick={handleClick}>
              {job.title}
            </Typography>
            <Box display="flex" alignItems="center">
              <img className="summary-logoCO-recruitment" src={job.CO? job.CO.logo : LogoCty}></img>
              <Typography color="text.secondary" sx={{ml: 1}}>{job.CO? job.CO.name : "ko co ten"}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{mt: 1}}>
              <AttachMoneyIcon></AttachMoneyIcon>
              <Typography variant="body2" sx={{ml: 1, fontSize: 25}}>{job.salaryfrom} - {job.salaryto} </Typography>
            </Box>
            <Box display="flex" alignItems="center"  sx={{mt: 1}}>
              <LanTwoToneIcon></LanTwoToneIcon>
              <Typography variant="body2" sx={{ml: 1}}>  {job.form === "flex"
    ? "Linh hoạt"
    : job.form === "home"
    ? "Tại nhà"
    : job.form === "office"
    ? "Văn phòng"
    : job.form}</Typography>
            </Box>
            <Box display="flex" alignItems="center"  sx={{mt: 1}}>
              <PinDropOutlinedIcon></PinDropOutlinedIcon>
              <Typography variant="body2" sx={{ml: 1}}>{job.address.district+" , "+job.address.city}</Typography>
            </Box>
            <Box  sx={{mt: 1}}>
              {job.tag.skill.map((skill) => (
                <Chip  sx={{m: 0.5}} key={skill.id} label={skill} variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
    // </div>
  );
}
