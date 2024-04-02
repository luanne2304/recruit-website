import React from 'react'
import "./forget.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "@fontsource/roboto/400.css";

const Forget = () => {
  return (
    <Box className="wrap-login">
        <Box className="container">
        <h2>Quên mật khẩu</h2>
        <TextField
          sx={{ mt:"20px", width: "100%" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon></EmailIcon>
              </InputAdornment>
            ),
          }}
        />
        <Button sx={{mt:"20px", width: "100%" }} variant="contained" color="success">
          Tạo lại mật khẩu
        </Button>
        <Box sx={{mt:"20px", width: "100%" }}>
          <Box  sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="#" underline="none">
              {"Quay lại đăng nhập"}
            </Link>
            <Link href="#" underline="none">
              {"Đăng kí tài khoản mới"}
            </Link>
          </Box>
        </Box>
        </Box>
    </Box>
  )
}

export default Forget