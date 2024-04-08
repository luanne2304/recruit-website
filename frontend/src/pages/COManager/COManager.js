import React, { useState } from "react";
import {
  Typography,
  TextField,
  CardContent,
  Card,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  FilledInput,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material/";
import { styled } from '@mui/material/styles';
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CloudUploadIcon  from "@mui/icons-material/CloudUpload";
import axios from "axios"
import { FamilyRestroomTwoTone } from "@mui/icons-material";
// import CropEasy from "../../components/Crop/CropEasy";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const COManager = () => {

  const [openCrop,setOpenCrop]=useState(false)
  const [imgfile,setImgfile]= useState(null)

  const test=async ()=> {


    console.log(imgfile)
    const formData = new FormData();
    formData.append('image', imgfile);
    try{
    await axios.post("http://localhost:4000/api/CO/create",formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    } catch(error){
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    } 
  }

  return (
    // !openCrop ? (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <Card sx={{ width: "100%", mt: 5 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                pl: 10,
                pr: 10,
              }}
            >
              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="h4"
                component="div"
              >
                Thêm Công ty
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Tên công ty:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập tên công ty"
                  variant="outlined"
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Mô tả:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập mô tả công ty"
                  variant="outlined"
                  multiline
                  minRows={3}
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Link:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập link"
                  variant="outlined"
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Quy mô
                </Typography>
                <FormControl sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">Từ</InputLabel>
                  <FilledInput
                    name="salaryto"
                    value={null}
                    id="filled-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">
                        <SupervisedUserCircleIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {" --- "}
                <FormControl sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">Đến</InputLabel>
                  <FilledInput
                    name="salaryfrom"
                    value={null}
                    id="filled-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">
                        <SupervisedUserCircleIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Mã số thuế:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập Mã số thuế"
                  variant="outlined"
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  IDusermanager:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập tài khoản quản lý"
                  variant="outlined"
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Logo công ty:
                </Typography>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Ảnh bìa công ty:
                </Typography>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  // type="file"
                  // onChange={(e)=>setImgfile(e.target.files[0])}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" onChange={(e)=>setImgfile(e.target.files[0])}/>
                </Button>
              </Typography>
            </CardContent>
            <Stack
                direction="row"
                spacing={2}
                sx={{ mb: 3, mr: 3, float: "right" }}
              >
                <Button variant="outlined" color="error">
                  Xóa bài
                </Button>
                <Button variant="contained" color="success" onClick={test}>
                  Lưu
                </Button>
              </Stack>
          </Card>
        </Box>
      </Box>
    </Box>
    // ) : (
    //   <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
    // )
  );
};

export default COManager;
