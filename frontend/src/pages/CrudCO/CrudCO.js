import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  CardContent,
  Card,
  Box,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  Button,
  Stack,

} from "@mui/material/";
import { styled } from '@mui/material/styles';
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CloudUploadIcon  from "@mui/icons-material/CloudUpload";
import CropEasy from "../../components/Crop/CropEasy";
import FormAddress from "../../components/FormAddress/FormAddress";

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

const CrudCO = () => {

  const [fileLOGO, setFileLOGO] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [openCropLOGO, setOpenCropLOGO] = useState(false);
  const [aspect,setAspect]=useState();

  const [listaddress, setListaddress] = useState([]);

  const handleChangeLOGO = (e) => {
    const fileLOGO = e.target.files[0];
    if (fileLOGO) {
      setFileLOGO(fileLOGO);
      setFormData({ ...formData, image : fileLOGO });
      setPhotoURL(URL.createObjectURL(fileLOGO));
      setOpenCropLOGO(true);
      setAspect(1)
    }
  };

  const [formData, setFormData] = useState({
    image: null,
    nameCO: "",
    desCO: "",
    linkCO: "",
    scaleto: null,
    scalefrom: null,
    taxcode: "",
    iDusermanager: "",
    listaddress: [],
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit=async ()=> {
    console.log(listaddress)

    // formData.append('listaddress', JSON.stringify(listaddress));
    console.log(formData)
  //   try{
  //     console.log("aa")
  //   const res =await axios.post("http://localhost:4000/api/CO/create",formData,{
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   }
  // )
  //   } catch(error){
  //     console.log("bb")
  //     console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
  //   } 
  }

  useEffect(() => {
    setFormData({ ...formData, listaddress:  JSON.stringify(listaddress)});
  }, [listaddress]);

  return (
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
                  value={formData.nameCO}
                  name="nameCO"
                  onChange={handleChange}
                />
              </Typography>

              <FormAddress listaddress={listaddress} setListaddress={setListaddress}/>

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
                  value={formData.desCO}
                  name="desCO"
                  onChange={handleChange}
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
                  value={formData.linkCO}
                  name="linkCO"
                  onChange={handleChange}
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Quy mô:
                </Typography>
                <FormControl sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">Từ</InputLabel>
                  <FilledInput  
                    id="filled-adornment-amount"
                    value={formData.scalefrom}
                    name="scalefrom"
                    onChange={handleChange}
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
                    id="filled-adornment-amount"
                    value={formData.scaleto}
                    name="scaleto"
                    onChange={handleChange}
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
                  value={formData.taxcode}
                  name="taxcode"
                  onChange={handleChange}
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
                  value={formData.iDusermanager}
                  name="iDusermanager"
                  onChange={handleChange}
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
                  <VisuallyHiddenInput type="file"   onChange={handleChangeLOGO} />
                </Button>
              </Typography>
            </CardContent>
            <Stack
                direction="row"
                spacing={2}
                sx={{ mb: 3, mr: 3, float: "right" }}
              >
                <Button variant="outlined" color="error">
                  Hủy
                </Button>
                <Button variant="contained" color="success" onClick={submit}>
                  Lưu
                </Button>
              </Stack>
          </Card>
        </Box>
      </Box>
      {openCropLOGO && (
        <CropEasy
          photoURL={photoURL}
          setOpenCrop={setOpenCropLOGO}
          setPhotoURL={setPhotoURL}
          setFile={setFileLOGO}
          aspect={aspect}
        />
      )}
    </Box> 
  );
};
// /
export default CrudCO;