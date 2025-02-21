import * as React from "react";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LanTwoToneIcon from '@mui/icons-material/LanTwoTone';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LogoCty from "../../assets/images/logocty.jpg";
import DialogApplyCV from "../DialogApplyCV/DialogApplyCV";
import "./DetailJobswift.css";

const DetailJobswift = ({ job }) => {
  const [open, setOpen] = React.useState(false);

  const timecalculator = () => {
    const currentDate = new Date(); // Lấy ngày và giờ hiện tại
    const difference = (currentDate - new Date(job.createdAt)) / 1000; // Tính thời gian chênh lệch
    switch (true) {
      case difference < 60:
        return "Vừa xong";
      case difference < 3600:
        return Math.floor(difference / 60) + " phút trước";
      case difference < 86400:
        return Math.floor(difference / 3600) + " giờ trước";
      case difference < 604800:
        return Math.floor(difference / 86400) + " ngày trước";
        default:
          return Math.floor(difference / 604800) + " tuần trước";
    }
  };

  return (
    <>
      <DialogApplyCV open={open} setOpen={setOpen} idpost={job._id} />
      <Box sx={{ width: "100%", height: "100%", mr: 2 }}>
        <Card
          sx={{ p: 3 }}
          variant="outlined"
          style={{ position: "relative", borderRadius: 16, padding: 0 }}
        >
          {/* <Box position="absolute" top={0} right={0} sx={{ margin: 2 }}>
          HOT
        </Box> */}
          <React.Fragment>
            <CardContent>
              <Box display="flex" alignItems="center">
                <img
                  className="swift-logoCO-recruitment"
                  src={job.CO ? job.CO.logo : LogoCty}
                ></img>
                <Box>
                  <Typography  component="div" sx={{fontSize: "1.27rem", fontWeight: "bold"}}>
                    {job.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {job.CO ? job.CO.name : "ko co ten"}
                  </Typography>
                  <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                    <AttachMoneyIcon></AttachMoneyIcon>
                    <Typography variant="body2" sx={{ ml: 1, fontSize: 25 }}>
                      {job.salaryfrom} - {job.salaryto} USD
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Button
                sx={{ mt: "20px", width: "100%" }}
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
              >
                Ứng tuyển
              </Button>
              <Box className="preview-job-content" sx={{ mt: 4 }}>
                <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                  <PinDropOutlinedIcon></PinDropOutlinedIcon>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {job.address.streetnumber +
                      ", " +
                      job.address.ward +
                      ", " +
                      job.address.district +
                      ", " +
                      job.address.city}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                  <LanTwoToneIcon></LanTwoToneIcon>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                                {job.form === "flex"
                  ? "Linh hoạt"
                  : job.form === "home"
                  ? "Tại nhà"
                  : job.form === "office"
                  ? "Văn phòng"
                  : job.form}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                  <AccessTimeIcon></AccessTimeIcon>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {timecalculator()}
                  </Typography>
                </Box>
                <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                  <Box
                    component="span"
                    sx={{  display: "inline"}}
                  >
                    Kỹ năng:
                  </Box>{" "}
                  {job.tag.skill.map((skill) => (
                    <Chip
                      sx={{ m: 0.5 }}
                      key={skill.id}
                      label={skill}
                      variant="outlined"
                    />
                  ))}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" component="div" sx={{ mt: 2,fontSize: "1.27rem", fontWeight: "bold",color: "var(--red-color)" }}>
                    Mô tả công việc
                  </Typography>
                  <Typography
                      sx={{ lineHeight: 1.5 }}
                      dangerouslySetInnerHTML={{ __html: job.des }}
                    />
      
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" component="div" sx={{fontSize: "1.27rem", fontWeight: "bold",color: "var(--red-color)"}}>
                    Yêu cầu công việc
                  </Typography>
                  <Typography
                      sx={{ lineHeight: 1.5 }}
                      dangerouslySetInnerHTML={{ __html: job.require }}
                    />
           
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" component="div"  sx={{fontSize: "1.27rem", fontWeight: "bold",color: "var(--red-color)"}}>
                    Quyền lợi
                  </Typography>
                  <Typography
                      sx={{ lineHeight: 1.5 }}
                      dangerouslySetInnerHTML={{ __html: job.benefit }}
                    />
                </Box>
              </Box>
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
};

export default DetailJobswift;
