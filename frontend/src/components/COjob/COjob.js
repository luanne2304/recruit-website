import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LanTwoToneIcon from "@mui/icons-material/LanTwoTone";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import LogoCty from "../../assets/images/logocty.jpg";
import DialogApplyCV from "../DialogApplyCV/DialogApplyCV";
import "./COjob.css";
import { useNavigate } from "react-router-dom";

const COjob = ({ data, owner }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/home/EditPost/${data.CO._id}/${data._id}`);
  };

  const handleCVreview = () => {
    navigate(`/home/CVreview/${data._id}`);
  };

  const handleClickPost = () => {
    navigate(`/home/DetailJob/${data._id}`);
  };

  const handleClickCO = () => {
    navigate(`/home/DetailCO/${data.CO._id}`);
  };

  const timecalculator = () => {
    const currentDate = new Date(); // Lấy ngày và giờ hiện tại
    const difference = (currentDate - new Date(data.createdAt)) / 1000; // Tính thời gian chênh lệch
    switch (true) {
      case difference < 60:
        return " Vừa xong";
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
      <DialogApplyCV open={open} setOpen={setOpen} idpost={data._id} />
      <Box sx={{ width: "100%", maxWidth: 712, mr: 2 }}>
        <Card
          variant="outlined"
          sx={{ borderRadius: "16px", position: "relative" }}
        >
          {owner && (
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "red",
                backgroundColor: "rgba(255, 87, 87, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                },
              }}
              onClick={() => console.log("Xóa bài đăng!")} // Thay bằng hàm thực tế
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}

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
                <img
                  onClick={handleClickCO}
                  className="COjob-logo"
                  src={data.CO.logo}
                ></img>
                <Box sx={{ ml: 3 }}>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                    component="div"
                    onClick={handleClickPost}
                  >
                    {data.title}
                  </Typography>
                  <Typography color="text.secondary" onClick={handleClickCO}>
                    {data.CO.name}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                <AttachMoneyIcon></AttachMoneyIcon>
                <Typography variant="body2" sx={{ ml: 1, fontSize: "1rem" }}>
                  {data.salaryfrom} - {data.salaryto} USD
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                {/* Bên trái - Thông tin `data.form` và `data.address.city` */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LanTwoToneIcon />
                  <Typography sx={{ fontSize: "1rem" }}>
                    {data.form === "flex"
                      ? "Linh hoạt"
                      : data.form === "home"
                      ? "Tại nhà"
                      : data.form === "office"
                      ? "Văn phòng"
                      : data.form}
                  </Typography>
                  <PinDropOutlinedIcon />
                  <Typography sx={{ fontSize: "1rem" }}>
                    {data.address.city}
                  </Typography>
                </Box>

                {/* Bên phải - Các nút */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {owner ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleEditClick}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleCVreview}
                      >
                        Duyệt hồ sơ
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" color="success"   onClick={() => setOpen(true)}>
                      Ứng tuyển
                    </Button>
                  )}
                </Box>
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
    </>
  );
};

export default COjob;
