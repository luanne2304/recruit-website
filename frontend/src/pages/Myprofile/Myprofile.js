import React from "react";
import axios from "axios";
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
import ButtonDialogFormPDF from "../../components/ButtonDialogFormPDF/ButtonDialogFormPDF";


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
  

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const id="660cfd11a53d71f4940dcc55"
        const temp = [];
        const res = await axios.get(`http://localhost:4000/api/user/${id}`);
        res.data.data.CV.map((item)=>(
          temp.push({filetitle:item.filetitle,linkfile:item.linkfile,_id:item._id})
        ));
        console.log(temp)
        setCv(temp)
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getUserData();
    // getUserData();
  }, []);

  // const getUserData = async () => {
  //   const res = await userService.getUserById();
  //   if(res.data) {
  //     setFullName(res.data.fullName);
  //     setPhone(res.data.sdt);
  //     setEmail(res.data.email);
  //     setAvatar(res.data.avatar);
  //     setCv(res.data.cv);
  //   }
  // };

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
    const data = {
      fullName: fullName,
      sdt: phone,
      avatar: avatar,
    };
    userService.updateUser(data).then((res) => {
      if (res.success) {
        alert("Cập nhật thành công");
      }
    });
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
                  onChange={(e) => setFullName(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
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
                <ButtonDialogFormPDF></ButtonDialogFormPDF>
          </Box>
          <Box sx={{mt:2, width:"100%"}}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {cv.map((item)=>(
                <Grid item xs={6} >
                  <CV title={item.filetitle} id={item._id} link={item.linkfile}></CV>
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
