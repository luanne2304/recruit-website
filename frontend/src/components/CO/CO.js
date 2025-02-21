import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import CameraAltIcon from "@mui/icons-material/CameraAlt"; // Icon máy ảnh
import { CardActionArea, Button, Box } from "@mui/material";
import CropEasy from '../Crop/CropEasy';
import { useAuth  } from '../../utils/authUtils';
import COService from "../../services/COService";
import background from "../../assets/images/logo.jpg";
import logocty from "../../assets/images/logocty.jpg";
import "./CO.css";

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

const CO = ({data,owner}) => {
    const { accessToken } = useAuth()
    const [formData, setFormData] = useState({
        image: null,
    });
    const [fileBackground, setFileBackground] = useState(null);
    const [photoURLCrop, setPhotoURLCrop] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [openCropBackground, setOpenCropBackground] = useState(false);
    const [aspect,setAspect]=useState();
  
    const handleImageChange = (e) => {
      const fileBackground = e.target.files[0]; 
      if (fileBackground) {
        setPhotoURLCrop(URL.createObjectURL(fileBackground));
        setOpenCropBackground(true);
        setAspect(2.86);
      }
    };

    const onClicksave= async()=>{
      try{
        const res = await COService.updateCoverImg(accessToken,formData,data._id)
        console.log(res)
      }
      catch(e){
        console.log("gui api ko thanh cong:"+e)
      }
    }
  
    const navigate = useNavigate();
    const handleClick=()=>{
      navigate(`/home/EditMyCO/${data._id}`)
    }

      useEffect(() => {
        setFormData({ image:fileBackground});
      }, [fileBackground]);

      useEffect(() => {
        if (data?.coverimg) {
          setPhotoURL(data.coverimg);
        }
      }, [data]); 

  return (
    <Card className="card-CO" sx={{   borderRadius: "20px", width: "100%" }}>
    <img className="logo-CO" src={data? data.logo : logocty} />
    <CardActionArea>
    <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="255"
            image={photoURL || background}
            alt="green iguana"
          />
          {owner && formData.image===null && (
            <Button
              role={undefined}
              component="label"
              variant="contained"
              startIcon={<CameraAltIcon />}
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              Chọn ảnh bìa
              <VisuallyHiddenInput
                type="file"
                onChange={handleImageChange}
              />
            </Button>
          )}
        {owner && formData.image!==null && (<>
                      <Button
                      role={undefined}
                      component="label"
                      variant="contained"
                      startIcon={<CameraAltIcon />}
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 110,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        color: "black",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                        },
                      }}
                    >
                      Chọn ảnh bìa
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleImageChange}
                      />
                    </Button>
            <Button
              role={undefined}
              component="label"
              variant="contained"
              startIcon={<CameraAltIcon />}
              onClick={onClicksave}
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(35, 199, 103, 0.8)",
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgb(9, 172, 58)",
                },
              }}
            >
              Lưu
            </Button>
            </>)}
        </Box>
      <CardContent sx={{ ml: 30, pb: 4 }}>
        <Typography gutterBottom component="div" sx={{fontSize: "1.27rem", fontWeight: "bold"}}>
          {data? data.name: "Nan"}
          {owner && <BorderColorTwoToneIcon onClick={handleClick}></BorderColorTwoToneIcon>}
        
        </Typography>
        <Typography component="div" sx={{ display: "flex" ,gap:10}}>
          <Typography variant="body2" component="div">
          {data? data.link: "Nan"}
          </Typography>
          <Typography variant="body2" component="div">{data? data.scalefrom +" - "+ data.scaleto +" nhân viên":"Nan"}</Typography>
          <Typography variant="body2" component="div"  >Nan bài đăng tuyển dụng</Typography>
        </Typography>
      </CardContent>
    </CardActionArea>
    {openCropBackground && (
        <CropEasy
          photoURL={photoURLCrop}
          setOpenCrop={setOpenCropBackground}
          setPhotoURL={setPhotoURL}
          setFile={setFileBackground}
          aspect={aspect}
        />
      )}
  </Card>
  )
}

export default CO