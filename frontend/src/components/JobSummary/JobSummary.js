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
import "./JobSummary.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function JobSummary() {
  const skillchips = [
    { title: "Intern" },
    { title: "Fresher"},
    { title: "Juinor" },
    { title: "Senior" },
    { title: "Manager" },
  ];
  return (
    <Box sx={{ minWidth: 275 , mr: 2 }} >
      <Card variant="outlined" style={{ position: 'relative',borderRadius: 16 }}>
        <Box position="absolute"  top={0} right={0} sx={{ margin: 2}}>HOT</Box>
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Đăng 1 ngày trước
            </Typography>
            <Typography variant="h5" component="div">
              Juinor/ Senior Mobile Developer (React Native, Flutter)
            </Typography>
            <Box display="flex" alignItems="center">
              <img className="summary-logoCO-recruitment" src={LogoCty}></img>
              <Typography color="text.secondary" sx={{ml: 1}}>Công ty FPT</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{mt: 1}}>
              <PaidIcon></PaidIcon>
              <Typography variant="body2" sx={{ml: 1, fontSize: 25}}>700 - 1000 USD</Typography>
            </Box>
            <Box display="flex" alignItems="center"  sx={{mt: 1}}>
              <WorkOutlineIcon></WorkOutlineIcon>
              <Typography variant="body2" sx={{ml: 1}}>Tại văn phòng</Typography>
            </Box>
            <Box display="flex" alignItems="center"  sx={{mt: 1}}>
              <PlaceIcon></PlaceIcon>
              <Typography variant="body2" sx={{ml: 1}}>Hà nội</Typography>
            </Box>
            <Box  sx={{mt: 1}}>
              {skillchips.map((skill, index) => (
                <Chip  sx={{m: 0.5}} key={index} label={skill.title} variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
