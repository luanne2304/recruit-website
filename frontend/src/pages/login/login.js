import { useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import {auth,provider} from "../../config/index"
import {signInWithPopup} from "firebase/auth"
import "@fontsource/roboto/400.css";
import "./login.css";
import userService from "../../services/userService";
import { NavLink, useNavigate } from "react-router-dom";



const Login = () => {

  const { setAccessToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const loginByEmail = async () => {
    try {
      const res = await userService.login(email, password);
      if (res.success) {
        setAccessToken(res.accessToken);
        navigate("/home");
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };



  const loginWithGG= async ()=>{
    signInWithPopup(auth,provider).then(async (data)=>{
      try{
      const res = await userService.signinnwithGG(data);
      setAccessToken(res.accessToken);
      navigate("/home");
      } catch(error){
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    })
  };


  return (
    <Box className="wrap-login">
      <Box className="container">
        <h2>Chào mừng bạn đến với HL</h2>
        <TextField
          sx={{ mb: "20px", width: "100%" }}
          id="outlined-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={() => loginByEmail()}
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
            <NavLink to="/log/register" underline="none">
              Đăng ký
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
