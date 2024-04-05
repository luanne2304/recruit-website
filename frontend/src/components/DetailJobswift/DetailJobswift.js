import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import PaidIcon from "@mui/icons-material/Paid";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoCty from "../../assets/images/logocty.jpg";
import "./DetailJobswift.css";


const DetailJobswift = ({job}) => {

  // console.log(job)
  const timecalculator =()=>{
    const currentDate = new Date(); // Lấy ngày và giờ hiện tại
    const difference = (currentDate - new Date(job.createdAt))/1000; // Tính thời gian chênh lệch
    switch (true) {
      case difference <60:
        return "Vừa xong";
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
    <Box sx={{ width: "100%", height: "100%", mr: 2 }}>
      <Card
        sx={{ p: 3 }}
        variant="outlined"
        style={{ position: "relative", borderRadius: 16 }}
      >
        <Box position="absolute" top={0} right={0} sx={{ margin: 2 }}>
          HOT
        </Box>
        <React.Fragment>
          <CardContent>
            <Box display="flex" alignItems="center">
              <img className="swift-logoCO-recruitment" src={LogoCty}></img>
              <Box>
                <Typography variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography color="text.secondary">{job.CO}</Typography>
                <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                  <PaidIcon></PaidIcon>
                  <Typography variant="body2" sx={{ ml: 1, fontSize: 25 }}>
                    {job.salaryto} - {job.salaryfrom} USD
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              sx={{ mt: "20px", width: "100%" }}
              variant="contained"
              color="error"
            >
              Ứng tuyển
            </Button>
            <Box className="preview-job-content"  sx={{ mt: 4 }}>
              <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                <PlaceIcon></PlaceIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {job.address}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                <WorkOutlineIcon></WorkOutlineIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {job.form}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                <AccessTimeIcon></AccessTimeIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {timecalculator()}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                Kỹ năng:
                {job.tag.skill.map((skill) => (
                  <Chip
                    sx={{ m: 0.5 }}
                    key={skill.id}
                    label={skill}
                    variant="outlined"
                  />
                ))}
              </Box>
              <Box sx={{ mt: 2}}>
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  Mô tả công việc
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: job.des }}></div>

              </Box>
              <Box sx={{ mt: 2}}>
                <Typography variant="h5" component="div">
                  Yêu cầu công việc
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: job.require }}></div>
              </Box>
              <Box sx={{ mt: 2}}>
                <Typography variant="h5" component="div">
                  Quyền lợi
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: job.benefit }}></div>
              </Box>
            </Box>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default DetailJobswift;
