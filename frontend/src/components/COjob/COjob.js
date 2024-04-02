import React from "react";
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

const COjob = () => {
  const skillchips = [
    { title: "Intern" },
    { title: "Fresher" },
    { title: "Juinor" },
    { title: "Senior" },
    { title: "Manager" },
  ];

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
              Đăng 1 ngày trước
            </Typography>
            <Box display="flex" alignItems="center">
              <img className="COjob-logo" src={LogoCty}></img>
              <Box sx={{ ml: 3 }}>
                <Typography variant="h5" component="div">
                  Juinor/ Senior Mobile Developer (React Native, Flutter)
                </Typography>
                <Typography color="text.secondary">Công ty FPT</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <PaidIcon></PaidIcon>
              <Typography variant="body2" sx={{ ml: 1, fontSize: 25 }}>
                700 - 1000 USD
              </Typography>
            </Box>
            <Box sx={{display:"flex", alignItems:"center" , justifyContent:"space-between", mt: 1 }}>
              <Box sx={{display:"flex" ,alignItems:"center" }}>
                <WorkOutlineIcon></WorkOutlineIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Tại văn phòng
                </Typography>
                <PlaceIcon sx={{ ml: 5 }}></PlaceIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Hà nội
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
              {skillchips.map((skill, index) => (
                <Chip
                  sx={{ m: 0.5 }}
                  key={index}
                  label={skill.title}
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
