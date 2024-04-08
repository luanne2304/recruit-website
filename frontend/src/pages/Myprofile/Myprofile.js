import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CV from "../../components/CV/CV";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Myprofile.css";
import Avatar from "../../assets/images/logocty.jpg";
import userService from "../../services/userService";
// import { storage } from "../../services/fire_base";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Myprofile = () => {
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [cv, setCv] = React.useState([]);
  

  // React.useEffect(() => {
  //   fetchUser();
  // }, []);

  const fetchUser = async () => {
    const res = await userService.getUserById();
    if (res.success) {
      setFullName(res.data.username);
      setPhone(res.data.sdt);
      setEmail(res.data.email);
      setAvatar(res.data.avatar);
      setCv(res.data.cv);

    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        setAvatar(reader.result);
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = () => {
    
  }

  return (
    <Box>
      <Box className="main" sx={{ mt: 10 }}>
        <Box className="icontainer">
          <Box className="container-profile">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" component="div" sx={{ m: "auto", mb: 5 }}>
              Hồ sơ
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <img src={avatar || Avatar} style={{ width: 250 }} />
              <Box textAlign="center">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                </Button>
              </Box>
            </Box>
            <Box
              sx={{ ml: 5, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                  Họ & Tên:
                </Typography>
                <TextField
                  sx={{ width: 400 }}
                  id="outlined-basic"
                  label="Nhập tên của bạn"
                  variant="outlined"
                  value={fullName}
                />
              </Box>
              <Box>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                  SDT:
                </Typography>
                <TextField
                  sx={{ width: 400 }}
                  id="outlined-basic"
                  label="Nhập SDT"
                  variant="outlined"
                  value={phone}
                />
              </Box>
              <Box>
                <Typography sx={{ mb: 2 }} variant="h6" component="div">
                  Mail:
                </Typography>
                <TextField
                  sx={{ width: 400 }}
                  id="outlined-basic"
                  label="Nhập mail"
                  variant="outlined"
                  value={email}
                />
              </Box>
            </Box>
          </Box>

          <Button sx={{ mt: 3, float: "right" }} variant="contained" onClick={() => handleChange()}>
            Xác nhận
          </Button>
          <Box sx={{ mt: 7, display: "flex", gap: 4 }}>
            <Typography variant="h5" component="div">
              CV đã lưu:
            </Typography>
            <Button variant="contained">Thêm CV</Button>
          </Box>
          <Box sx={{mt:2, width:"100%"}}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {Array.from(Array(5)).map((_, index) => (
                <Grid item xs={6}>
                  <CV>1</CV>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Myprofile;
