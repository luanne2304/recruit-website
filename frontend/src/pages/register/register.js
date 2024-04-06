import {useState} from "react";
import "./register.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from '@mui/icons-material/Person';
import "@fontsource/roboto/400.css";
import userService from "../../services/userService";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if(validater() === false) {
      return;
    }
    // call api register
    userService.register(fullName, email, password).then((res) => {
      if (res.success) {
        alert("Đăng ký thành công");
        navigate("/log/login");
      } else {
        alert("Đăng ký thất bại");
      }
    });
  };

  const handleRegisterByGG = () => {
    // call api register by google from google

    
  };

  const validater = () => {
    if (fullName === "" || email === "" || password === "" || rePassword === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return false;
    }
    if (password !== rePassword) {
      alert("Mật khẩu không khớp");
      return false;
    }

    return true;
  };


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
          label="Tên đăng nhập"
          onChange={(e) => setfullName(e.target.value)}
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
         <TextField
          sx={{ mt:"20px", width: "100%" }}
          type={showPassword ? "text" : "password"}
          label="mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon></LockIcon>
              </InputAdornment>
            ),
            endAdornment: (
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
            ),
          }}
        />
        <TextField
          sx={{ mt:"20px", width: "100%" }}
          type={showPassword ? "text" : "password"}
          label="nhập lại mật khẩu"
          onChange={(e) => setRePassword(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon></LockIcon>
              </InputAdornment>
            ),
            endAdornment: (
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
            ),
          }}
        />
        <Button sx={{mt:"20px", width: "100%" }}
         variant="contained" 
         color="success" 
         onClick={() => handleRegister()}>
          Đăng Ký
        </Button>
        <Box sx={{mt:"20px", width: "100%" }} textAlign="center">Hoặc đăng nhập bằng</Box>
        <Button variant="contained" color="error" sx={{mt:"20px", width: "100%" }}
        onClick={() => handleRegisterByGG()}>
          <GoogleIcon></GoogleIcon>Google
        </Button>
        <Box textAlign="center" sx={{mt:"20px", width: "100%" }}>
          <Box>
            Bạn đã có tài khoản? 
            <Link onClick={() => navigate('/log/login')} underline="none">
              {" Đăng nhập ngay"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
