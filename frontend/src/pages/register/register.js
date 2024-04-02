import {useState} from "react";
import "./register.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from '@mui/icons-material/Person';
import "@fontsource/roboto/400.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="wrap-register">
      <Box className="container">
      <h2>Chào mừng bạn đến với HL</h2>
      <TextField
          sx={{ mt:"20px", width: "100%" }}
          id="outlined-basic"
          label="Họ và Tên"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon></PersonIcon>
              </InputAdornment>
            ),
          }}
        />
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
         <FormControl sx={{ mt:"20px",width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
           Mật khẩu
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon></LockIcon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mật khẩu"
          />
        </FormControl>
        <FormControl sx={{mt:"20px", width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
          Nhập lại mật khẩu
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon></LockIcon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Nhập lại mật khẩu"
          />
        </FormControl>
        <Button sx={{mt:"20px", width: "100%" }} variant="contained" color="success">
          Đăng Ký
        </Button>
        <Box sx={{mt:"20px", width: "100%" }} textAlign="center">Hoặc đăng nhập bằng</Box>
        <Button variant="contained" color="error" sx={{mt:"20px", width: "100%" }}>
          <GoogleIcon></GoogleIcon>Google
        </Button>
        <Box textAlign="center" sx={{mt:"20px", width: "100%" }}>
          <Box>
            Bạn đã có tài khoản? 
            <Link href="#" underline="none">
              {" Đăng nhập ngay"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
