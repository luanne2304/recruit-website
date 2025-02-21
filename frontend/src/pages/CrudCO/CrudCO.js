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
import { useParams } from 'react-router-dom';
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CloudUploadIcon  from "@mui/icons-material/CloudUpload";
import CropEasy from "../../components/Crop/CropEasy";
import FormAddress from "../../components/FormAddress/FormAddress";
import Avatar from "../../assets/images/logocty.jpg";

import { useAuth  } from '../../utils/authUtils';
import COService from "../../services/COService";

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
  const { accessToken } = useAuth()
  const { idCO } = useParams();
  const [fetchco,setFetchco] =useState()

  const [fileLOGO, setFileLOGO] = useState(null);
  const [photoURLCrop, setPhotoURLCrop] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [openCropLOGO, setOpenCropLOGO] = useState(false);
  const [aspect,setAspect]=useState();

  const [listaddress, setListaddress] = useState([]);

  const handleChangeLOGO = (e) => {
    const fileLOGO = e.target.files[0]; 
    if (fileLOGO) {
      setFileLOGO(fileLOGO);
      setFormData({ ...formData, image : fileLOGO });
      setPhotoURLCrop(URL.createObjectURL(fileLOGO));
      setOpenCropLOGO(true);
      setAspect(1)
    }
  };

  const defaultFormData={
    image: null,
    nameCO: "",
    desCO: "",
    linkCO: "",
    scaleto: "",
    scalefrom: "",
    taxcode: "",
    iDusermanager: "",
    listaddress: "[]",
  }

  const [formData, setFormData] = useState({
    image: null,
    nameCO: "",
    desCO: "",
    linkCO: "",
    scaleto: "",
    scalefrom: "",
    taxcode: "",
    iDusermanager: "",
    listaddress: [],
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setFormData({ ...formData,  [e.target.name]: value });
    }
  };

  const submitForm=async (e)=> {
    e.preventDefault();
    let allFieldsChanged = true;
    const checkscaleto= parseFloat(formData.scaleto);
    const checkscalefrom= parseFloat(formData.scalefrom);
    if (!isNaN(checkscaleto) && !isNaN(checkscalefrom)) {
      if(checkscalefrom>=checkscaleto){
        allFieldsChanged = false;
      }
    }else{
      allFieldsChanged = false;
    }
    for (let key in formData) {
      if (key === 'CO' || key === 'salaryto'|| key === 'salaryfrom') continue;
      if (JSON.stringify(formData[key]) === JSON.stringify(defaultFormData[key])) {
        console.log(`Field ${key} has not been changed.`);
        allFieldsChanged = false;  // Đặt biến cờ thành false nếu có trường chưa thay đổi
      }
    }
    if(allFieldsChanged) {
      if(idCO){
        try{
          const res =await COService.update(accessToken,formData,idCO)
          console.log(res)
        } catch(error){
          console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
        } 

    }else{
      try{
        const res =await COService.create(accessToken,formData)
        console.log(res)
      } catch(error){
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      } 
    }
    }
    else{
      console.log("loi~");
    }
  }
  useEffect(() => {
    setFormData({ ...formData, image:fileLOGO});
  }, [fileLOGO]);

  useEffect(() => {
    setFormData({ ...formData, listaddress:  JSON.stringify(listaddress)});
  }, [listaddress]);

  useEffect(() => {
    const getCO= async () => {
      try {
        if (idCO) {
          const response  = await axios.get(`http://localhost:4000/api/CO/getCObyID/${idCO}`);
          setFetchco(response.data.data)
          console.log(response.data.data)
          setFormData({ 
            nameCO:response.data.data.name,
            desCO:response.data.data.des,
            scaleto:response.data.data.scaleto,
            scalefrom:response.data.data.scalefrom,
            taxcode:response.data.data.taxcode,
            iDusermanager:response.data.data.idaccount_manager,
            linkCO:response.data.data.link,
          })
          let addressData  = response.data.data.address.map((address) => ({
            city: { label: address.city, code:address.city_code},
            district: { label: address.district, code:address.district_code},
            ward: { label: address.ward, code: address.ward_code},
            streetnumber: address.streetnumber
          }));
          setListaddress(addressData)
          setPhotoURL(response.data.data.logo)
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getCO();
  }, [idCO]);



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
                {idCO ? "Chỉnh sửa công ty" : "Thêm công ty"}
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
                    onChange={handleNumberChange}
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
                    onChange={handleNumberChange}
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
                  onChange={handleNumberChange}
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
                  <img src={photoURL || Avatar} style={{ width: 250 }} />
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
                <Button variant="contained" color="success" onClick={submitForm}>
                  Lưu
                </Button>
              </Stack>
          </Card>
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
// /
export default CrudCO;
