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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(2)" }}
  >
    •
  </Box>
);
const lorem = [
  { content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, autem." },
  { content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, autem." },
  { content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, autem." },
  { content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, autem." },
  { content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, autem." },
];
const skillchips = [
  { title: "Intern" },
  { title: "Fresher" },
  { title: "Juinor" },
  { title: "Senior" },
  { title: "Manager" },
];
const DetailJobswift = () => {
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
                  Juinor/ Senior Mobile Developer (React Native, Flutter)
                </Typography>
                <Typography color="text.secondary">Công ty FPT</Typography>
                <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                  <PaidIcon></PaidIcon>
                  <Typography variant="body2" sx={{ ml: 1, fontSize: 25 }}>
                    700 - 1000 USD
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
                  Tầng 19, tòa nhà Peakview Tower, 36 Hoàng Cầu, Đống Đa, Hà
                  Nội, Dong Da, Ha Noi
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                <WorkOutlineIcon></WorkOutlineIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Tại văn phòng
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                <AccessTimeIcon></AccessTimeIcon>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  1 ngày trước
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                Kỹ năng:
                {skillchips.map((skill, index) => (
                  <Chip
                    sx={{ m: 0.5 }}
                    key={index}
                    label={skill.title}
                    variant="outlined"
                  />
                ))}
              </Box>
              <Box sx={{ mt: 2}}>
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  Mô tả công việc
                </Typography>
                {lorem.map((item, index) => (
                  <Typography sx={{ mt: 1 }} key={index}>{bull} {item.content}</Typography>
                ))}
              </Box>
              <Box sx={{ mt: 2}}>
                <Typography variant="h5" component="div">
                  Yêu cầu công việc
                </Typography>
                {lorem.map((item, index) => (
                  <Typography sx={{ mt: 1 }} key={index}>{bull} {item.content}</Typography>
                ))}
              </Box>
              <Box sx={{ mt: 2}}>
                <Typography variant="h5" component="div">
                  Quyền lợi
                </Typography>
                {lorem.map((item, index) => (
                  <Typography sx={{ mt: 1 }} key={index}>{bull} {item.content}</Typography>
                ))}
              </Box>
            </Box>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default DetailJobswift;
