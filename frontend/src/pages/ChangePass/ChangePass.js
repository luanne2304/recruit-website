import React,{useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ChangePass.css";
import userService from "../../services/userService";

const ChangePass = () => {
  const [currentPassword, setCurrentPassword] = useState("12345678");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  // Hàm xử lý cập nhật mật khẩu
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }
    try {
      await userService.resetPassword(currentPassword, newPassword);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Box className="main" sx={{ mt: 15 }}>
        <Box className="icontainer">
          <Box className="container-changepass">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography component="div" sx={{ m: "auto",fontSize: "1.3rem", fontWeight: "bold" }}>
                Cập nhật mật khẩu
              </Typography>
            </Box>
            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 4 }}
            >
              <TextField
                id="outlined-basic"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                label="Mật khẩu hiện tại"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                label="Mật khẩu mới"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                label="Xác nhận lại mật khẩu"
                variant="outlined"
              />
            </Box>
            <Button color="success" sx={{ mt: 4, float: "right" }} variant="contained" onClick={handleChangePassword}>
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePass;
