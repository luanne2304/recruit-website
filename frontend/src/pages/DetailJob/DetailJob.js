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
                    <Box sx={{ display: "flex", gap: 5 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PaidIcon sx={{ fontSize: '50px' }} ></PaidIcon>
                        <Box>
                          <Typography variant="body2">Mức lương</Typography>
                          <Typography variant="body2">
                            700 - 1000 USD
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WorkOutlineIcon></WorkOutlineIcon>
                        <Box>
                          <Typography variant="body2">Hình thức</Typography>
                          <Typography variant="body2">Tại văn phòng</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PlaceIcon></PlaceIcon>
                        <Box>
                          <Typography variant="body2">Địa điểm</Typography>
                          <Typography variant="body2">Hà Nội</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Button
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
              <Box>basic</Box>
            </Box>
            <Box className="extra-container-wrap-detailjob">
              <Box>C</Box>
              <Box>date</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailJob;
