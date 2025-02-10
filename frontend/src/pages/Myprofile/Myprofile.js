import React, { useState, useRef, useEffect } from "react";
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
import CropEasy from "../../components/Crop/CropEasy";

import userService from "../../services/userService";
import ButtonDialogFormPDF from "../../components/ButtonDialogFormPDF/ButtonDialogFormPDF";
import { useAuth  } from '../../utils/authUtils';
import CVService from "../../services/CVService";



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


const Myprofile = () => {
  const { accessToken } = useAuth()
  const [userData, setUserData] = useState({
      id: "",
      fullName: "",
      email: "",
      phone: "",
      ava:null
  });

  const [fileLOGO, setFileLOGO] = useState(null);
  const [photoURLCrop, setPhotoURLCrop] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [openCropLOGO, setOpenCropLOGO] = useState(false);
  const [aspect,setAspect]=useState();

  const [cv, setCv] = React.useState([]);
  

  const handleEditorChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const temp = [];
        const resUser = await userService.getUserById(accessToken)
        console.log(resUser)
        setUserData({
          id: resUser.data._id,
          fullName: resUser.data.fullName,
          email: resUser.data.email,
          phone: resUser.data.sdt
        });
        setPhotoURL(resUser.data.avatar)
        const resCV= await CVService.getByUser(accessToken)
        resCV.data.map((item)=>(
          temp.push({filetitle:item.filetitle,linkfile:item.linkfile,_id:item._id})
        ));
        console.log(resCV)
        setCv(temp)
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getUserData();
    // getUserData();
  }, []);


  const handleImageChange = (e) => {
    const fileLOGO = e.target.files[0]; 
    if (fileLOGO) {
      setFileLOGO(fileLOGO);
      setUserData({ ...userData, ava : fileLOGO });
      setPhotoURLCrop(URL.createObjectURL(fileLOGO));
      setOpenCropLOGO(true);
      setAspect(1);
    }
  };

  const handleChange = () => {
    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("fullName", userData.fullName);
    formData.append("phone", userData.phone);
  
    if (fileLOGO) {
      formData.append("image", fileLOGO); 
    }

    userService.updateUser(formData,accessToken).then((res) => {
      if (res.success) {
        console.log(res)
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
              <img src={photoURL || Avatar} style={{ width: 250 }} />
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
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleEditorChange}
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
                  name="phone"
                  value={userData.phone}
                  onChange={handleEditorChange}
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
                  name="email"
                  value={userData.email}
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
      {openCropLOGO && (
        <CropEasy
          photoURL={photoURLCrop}
          setOpenCrop={setOpenCropLOGO}
          setPhotoURL={setPhotoURL}
          setFile={setFileLOGO}
          aspect={aspect}
        />
      )}
    </Box>
  );
};

export default Myprofile;
