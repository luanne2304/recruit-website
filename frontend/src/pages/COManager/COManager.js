import React, { useState,useEffect } from "react";
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
  Autocomplete,

} from "@mui/material/";
import { styled } from '@mui/material/styles';
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CloudUploadIcon  from "@mui/icons-material/CloudUpload";
import axios from "axios"
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

const COManager = () => {

  const [fileLOGO, setFileLOGO] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [openCropLOGO, setOpenCropLOGO] = useState(false);
  const [aspect,setAspect]=useState();

  const [fetchTP, setFetchTP]=useState([])
  const [fetchQH, setFetchQH]=useState([])
  const [fetchPX, setFetchPX]=useState([])
  const [tree,setTree]=useState()

  const [nameCO,setNameCO]=useState()
  const [address,setAddress]=useState([{
    city:"",
    district:"",
    ward:"",
    address:"",
  }])
  const [desCO,setDesCO]=useState()
  const [linkCO,setLinkCO]=useState()
  const [staffto,setStaffto]=useState()
  const [stafffrom,setStafffrom]=useState()
  const [taxcode,setTaxcode]=useState()
  const [iDusermanager,setIDusermanager]=useState()

  const handleChangeLOGO = (e) => {
    const fileLOGO = e.target.files[0];
    if (fileLOGO) {
      setFileLOGO(fileLOGO);
      setPhotoURL(URL.createObjectURL(fileLOGO));
      setOpenCropLOGO(true);
      setAspect(1)
    }
  };




  const test=async ()=> {
    console.log(fileLOGO)
    const formData = new FormData();
    formData.append('image', fileLOGO);
    formData.append('nameCO', nameCO);
    formData.append('desCO', desCO);
    formData.append('linkCO', linkCO);
    formData.append('staffto', staffto);
    formData.append('stafffrom', stafffrom);
    formData.append('taxcode', taxcode);
    formData.append('iDusermanager', iDusermanager);
    

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

  

  useEffect(()=>{
    const calltp =async ()=>{
      try{
        let tempCity=[]
        const res= await axios.get(`http://localhost:4000/api/getTree`)
        setTree(res.data);
        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            const code = res.data[key].code;
            const label = res.data[key].name;
            tempCity.push({ label, code });
          }
        }
        setFetchTP(tempCity)
        } catch(error){
          console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    }
    calltp()
  },[])

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
                  onChange={(e)=> setNameCO(e.target.value)}
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
                  onChange={(e)=> setDesCO(e.target.value)}
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
                  onChange={(e)=> setLinkCO(e.target.value)}
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
                    onChange={(e)=> setStafffrom(e.target.value)}
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
                    onChange={(e)=> setStaffto(e.target.value)}
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
                  onChange={(e)=> setTaxcode(e.target.value)}
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
                  // onChange={(e)=> setNameCO(e.target.value)}
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
                  Xóa bài
                </Button>
                <Button variant="contained" color="success" onClick={test}>
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
export default COManager;
