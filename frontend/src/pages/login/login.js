import { useState } from "react";
import "./login.css";
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
import {auth,provider} from "../../config/index"
import {signInWithPopup} from "firebase/auth"
import "@fontsource/roboto/400.css";

const Login = () => {
  const [value, setValue]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginWithGG=()=>{
    signInWithPopup(auth,provider).then((data)=>{
      // setValue(data.user.email)
      console.log(data)
    })
  }

  return (
    <Box className="wrap-login">
      <Box className="container">
        <h2>Chào mừng bạn đến với HL</h2>
        <TextField
          sx={{ mb: "20px", width: "100%" }}
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

        <FormControl sx={{ width: "100%" }} variant="outlined">
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
        <Box sx={{ mt: "20px", width: "100%" }} textAlign="right">
          <Link href="#" underline="none">
            {"Quên mật khẩu"}
          </Link>
        </Box>
        <Button
          sx={{ mt: "20px", width: "100%" }}
          variant="contained"
          color="success"
        >
          Đăng nhập
        </Button>
        <Box sx={{ mt: "20px", width: "100%" }} textAlign="center">
          Hoặc đăng nhập bằng
        </Box>
        <Button
          onClick={loginWithGG}
          variant="contained"
          color="error"
          sx={{width: "100%",mt:2}}
        >
          <GoogleIcon></GoogleIcon>Google
        </Button>
        <Box textAlign="center" sx={{ mt: "20px", width: "100%" }}>
          <Box>
            Bạn chưa có tài khoản?
            <Link href="#" underline="none">
              {" Đăng kí ngay"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
