import React from "react";
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
import "./DetailCO.css";
import CO from "../../components/CO/CO";
import COjob from "../../components/COjob/COjob";

const DetailCO = () => {
  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <CO></CO>
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
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica Lizards are a widespread group of squamate
                      reptiles, with over 6,000 species, ranging across all
                      continents except Antarctica Lizards are a widespread
                      group of squamate reptiles, with over 6,000 species,
                      ranging across all continents except AntarcticaLizards are
                      a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
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
                  <Button sx={{mb:2}} variant="contained" color="success">
                Tạo bài đăng
              </Button>
                    <COjob></COjob>
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
                    <Typography>toà nhà Youngjin E&C Hải Phòng, Hồng Phong, An Dương, Hải Phòng, Việt Nam </Typography>
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
