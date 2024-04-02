import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import PaidIcon from "@mui/icons-material/Paid";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import FlagIcon from '@mui/icons-material/Flag';
import Logocty from "../../assets/images/logocty.jpg";
import COjob from "../../components/COjob/COjob";
import "./DetailJob.css";

const DetailJob = () => {
  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box className="main-container-wrap-detailjob">
              <Box>
                <Card sx={{ width: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <Typography variant="h6">
                      Juinor/ Senior Mobile Developer (React Native, Flutter)
                    </Typography>
                    <Box sx={{ display: "flex", gap: 10 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PaidIcon sx={{ fontSize: "40px", mr: 2 }}></PaidIcon>
                        <Box>
                          <Typography variant="body2">Mức lương</Typography>
                          <Typography variant="body2">
                            700 - 1000 USD
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WorkOutlineIcon
                          sx={{ fontSize: "40px", mr: 2 }}
                        ></WorkOutlineIcon>
                        <Box>
                          <Typography variant="body2">Hình thức</Typography>
                          <Typography variant="body2">Tại văn phòng</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PlaceIcon sx={{ fontSize: "40px", mr: 2 }}></PlaceIcon>
                        <Box>
                          <Typography variant="body2">Địa điểm</Typography>
                          <Typography variant="body2">Hà Nội</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        sx={{ width: "70%" }}
                        variant="contained"
                        color="success"
                        endIcon={<SendIcon />}
                      >
                        Ứng tuyển
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <AccessTimeIcon></AccessTimeIcon>Thời hạn nộp :
                        01/04/2024
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box>
                <Card sx={{ width: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <Typography variant="h6">Chi tiết tuyển dụng</Typography>
                    <Box>
                      <Typography variant="h6">Mô tả công việc</Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores, repellat.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6">Yêu cầu ứng viên</Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores, repellat.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6">Quyền lợi</Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores, repellat.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6">Địa chỉ làm việc</Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores, repellat.
                      </Typography>
                    </Box>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                      <Button
                        sx={{ width: "20%" }}
                        variant="contained"
                        color="error"
                        endIcon={<FlagIcon />}
                      >
                        Báo cáo
                      </Button>
                      <Button
                        sx={{ width: "70%" }}
                        variant="contained"
                        color="success"
                        endIcon={<SendIcon />}
                      >
                        Ứng tuyển
                      </Button>
                    </Box>

                    <Typography variant="h6">
                      Các công việc liên quan
                    </Typography>
                    <COjob></COjob>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box className="extra-container-wrap-detailjob">
              <Box>
                <Card sx={{ width: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img src={Logocty} className="logoCO-DetailJob" />
                      <Typography variant="h5">Tập đoàn Hoa Sen</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                      <Typography> Quy mô:</Typography>
                      <Typography>150-300 nhân viên</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <PlaceIcon></PlaceIcon>
                      <Typography sx={{ width: "150px" }}> Địa chỉ:</Typography>
                      <Typography>
                        Tầng 19, tòa nhà Peakview Tower, 36 Hoàng Cầu, Đống Đa,
                        Hà Nội, Dong Da, Ha Noi
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box>
                <Card sx={{ width: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <Typography variant="h5">Thông tin chung</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                      <Typography> Kinh nghiệm:</Typography>
                      <Typography> Senior / Middle</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                      <Typography> Hình thức làm việc:</Typography>
                      <Typography> Tại văn phòng</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                      <Typography> Kĩ năng:</Typography>
                      <Typography> SQL , ReactNative , Flutter</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailJob;
