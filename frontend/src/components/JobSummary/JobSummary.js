import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import PaidIcon from "@mui/icons-material/Paid";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
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
        case difference<4579200:
          return Math.floor(difference/604800) +" tuần trước";
          default:
            return "Không xác định";
      }
    }

    const handleClick = () => {
      navigate(`/home/DetailJob/${job._id}`); // Replace with your desired URL
    };
    

  return (
    // <div onClick={handleClickSwift(key)}>
    <Box sx={{ minWidth: 275 , mr: 2,mb:2 }}  >
      <Card variant="outlined" style={{ position: 'relative',borderRadius: 16 }}>
        <Box position="absolute"  top={0} right={0} sx={{ margin: 2}}>HOT</Box>
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {timecalculator()}
            </Typography>
            <Typography variant="h5" component="div" onClick={handleClick}>
              {job.title}
            </Typography>
            <Box display="flex" alignItems="center">
              <img className="summary-logoCO-recruitment" src={LogoCty}></img>
              <Typography color="text.secondary" sx={{ml: 1}}>{job.CO}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{mt: 1}}>
              <PaidIcon></PaidIcon>
              <Typography variant="body2" sx={{ml: 1, fontSize: 25}}>{job.salaryto} - {job.salaryfrom} </Typography>
            </Box>
            <Box display="flex" alignItems="center"  sx={{mt: 1}}>
              <WorkOutlineIcon></WorkOutlineIcon>
              <Typography variant="body2" sx={{ml: 1}}>{job.form}</Typography>
            </Box>
            <Box display="flex" alignItems="center"  sx={{mt: 1}}>
              <PlaceIcon></PlaceIcon>
              <Typography variant="body2" sx={{ml: 1}}>Hà nội</Typography>
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
