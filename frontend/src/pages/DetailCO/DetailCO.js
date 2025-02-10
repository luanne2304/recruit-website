import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import PlaceIcon from "@mui/icons-material/Place";
import MapIcon from '@mui/icons-material/Map';
import media from '../../assets/images/backgroundLog.jpg'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../utils/authUtils';
import COService from "../../services/COService";
import postService from "../../services/postService";
import "./DetailCO.css";
import CO from "../../components/CO/CO";
import COjob from "../../components/COjob/COjob";

const DetailCO = () => {
  const { idCO } = useParams();
  const { accessToken } = useAuth()
  const [fetchco,setFetchco] =useState()
  const [fetchpost,setFetchpost] =useState()
  const [owner,setOwner]=useState(false)

  const navigate = useNavigate();

  const handleClick=()=>{
    navigate(`/home/DetailCO/CURDpost`)
  }


  React.useEffect(() => {

    const getALLjob = async () => {
      try {
        const res  = await COService.getByID(idCO)
        setFetchco(res.data)
        if(jwtDecode(accessToken)._id==res.data.idaccount_manager){
          console.log("ok")
        }
        const res2  = await postService.getALLJobByCO(idCO)
        setFetchpost(res2.data)
      } catch(error) {
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    };
    getALLjob();
  },[])

  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <CO data={fetchco}></CO>
          <Box sx={{ display: "flex", justifyContent: "space-between" , mt:5 }}>
            <Box className="main-content-wrap-CO">
              <Card sx={{ width: "100%" }} className="card-desCO">
                <Typography variant="h5" className="title-card-desCO">
                  Mô tả về công ty
                </Typography>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="50"
                    image={media}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography>
                      {fetchco && fetchco.des}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ width: "100%" , mt:4}} className="card-desCO">
                <Typography variant="h5" className="title-card-desCO">
                  Tuyển dụng
                </Typography>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="50"
                    image={media}
                    alt="green iguana"
                  />
                  <CardContent>
                  <Button variant="contained" color="success" onClick={handleClick}>
                    Tạo bài đăng
                  </Button>
                  {fetchpost && fetchpost.map((item, index)=>(
                    <Box key={index} sx={{mt:2}} >
                      <COjob data={item} ></COjob>
                    </Box>
                  ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box className="extra-content-wrap-CO"><Card sx={{ width: "100%" }} className="card-desCO">
                <Typography variant="h5" className="title-card-desCO">
                  Thông tin liên hệ
                </Typography>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="50"
                    image={media}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography sx={{display:"flex" ,alignItems:"center"}} component="div" >
                    <PlaceIcon></PlaceIcon>
                      <Typography sx={{ ml: 1 }}>
                        Địa chỉ công ty
                      </Typography>
                    </Typography>
                    <Typography>
                      {fetchco && fetchco.address.map((i, index)=>(
                      <Box key={index} sx={{mt:1}} >
                      Cơ sở {index+1}: {i.streetnumber}, {i.ward}, {i.district}, {i.city} 
                      </Box>
                      ))}
                    </Typography>
                    <Typography sx={{display:"flex",alignItems:"center", mt:5}} component="div" >
                    <MapIcon></MapIcon>
                      <Typography  sx={{ ml: 1 }}>
                        Xem bản đồ
                      </Typography>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card></Box>
          </Box>
          {/* <Typography
          
              variant="h6"
              component="div"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quibusdam quis. Nihil saepe, omnis repellendus sequi illo laudantium necessitatibus excepturi repellat alias nostrum. Praesentium voluptas doloremque debitis voluptatum voluptates corporis voluptatem suscipit optio rerum ipsa illo at, corrupti consequatur. Minus cumque rem qui explicabo nobis, perspiciatis, vitae ratione deleniti, distinctio doloremque sapiente accusantium quam. Quam nam inventore nobis magnam corporis exercitationem aut quaerat non culpa nostrum eaque hic sapiente tempore ex voluptatum rerum quae est voluptates numquam deserunt dolor quasi repellat, porro repellendus! Accusamus sequi explicabo illum enim totam sit laborum incidunt aut beatae, sapiente provident porro vero hic fuga.
        </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailCO;
