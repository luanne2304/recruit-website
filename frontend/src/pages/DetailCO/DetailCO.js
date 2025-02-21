import React, { useState,useEffect } from "react";
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
import Pagination from "@mui/material/Pagination";
import "./DetailCO.css";
import CO from "../../components/CO/CO";
import COjob from "../../components/COjob/COjob";

const DetailCO = () => {

    const [page, setPage] = useState(1);
  const limit=2;
    const [totalPages, setTotalPages] = useState(1);
  const { idCO } = useParams();
  const { accessToken } = useAuth()
  const [fetchco,setFetchco] =useState()
  const [fetchpost,setFetchpost] =useState()
  const [owner,setOwner]=useState(false)

  const navigate = useNavigate();

  const handleClick=()=>{
    navigate(`/home/CreatePost/${idCO}`)
  }

  const getALLjob = async (p) => {
    try {
      const res  = await postService.getALLJobByCO(idCO,p,limit)
      setFetchpost(res.data)
      setTotalPages(res.totalPages);
      setPage(p);
    } catch(error) {
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    }
  };

  const checkowner = async () => {
    try {
      const res  = await COService.getByID(idCO)
      setFetchco(res.data)
      if(jwtDecode(accessToken)._id==res.data.idaccount_manager){
        setOwner(true)
      }
    } catch(error) {
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    }
  };

  useEffect(() => {
      getALLjob(page);
  }, [page]);

  useEffect(() => {
    checkowner();
    getALLjob(1);
  },[])

  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <CO data={fetchco} owner={owner}></CO>
          <Box sx={{ display: "flex", justifyContent: "space-between" , mt:5 }}>
            <Box className="main-content-wrap-CO">
              <Card sx={{ width: "100%" }} className="card-desCO">
                <Typography sx={{ fontSize: "1rem", fontWeight: "bold"}} className="title-card-desCO">
                  Mô tả về công ty
                </Typography>
                <CardActionArea>
                <Box
                  sx={{
                    height: 50, 
                    width: "100%", 
                    background: "linear-gradient(to right,rgb(224, 35, 22),rgb(226, 61, 39),rgb(241, 130, 122))", 
                  }}
                />
                  <CardContent>
                    <Typography variant="body2"  className="whitespace-preline">
                      {fetchco && fetchco.des}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ width: "100%" , mt:4}} className="card-desCO">
                <Typography sx={{fontSize: "1rem", fontWeight: "bold"}} className="title-card-desCO">
                  Tuyển dụng
                </Typography>
                <CardActionArea>
                <Box
                  sx={{
                    height: 50, 
                    width: "100%", 
                    background: "linear-gradient(to right,rgb(224, 35, 22),rgb(226, 61, 39),rgb(241, 130, 122))", 
                  }}
                />
                  <CardContent>
                {owner==true &&  <Button variant="contained" color="success" onClick={handleClick}>
                    Tạo bài đăng
                  </Button>}
                  {fetchpost && fetchpost.map((item, index)=>(
                    <Box key={index} sx={{mt:2}} >
                      <COjob data={item} owner={owner}></COjob>
                    </Box>
                  ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box className="extra-content-wrap-CO"><Card sx={{ width: "100%" }} className="card-desCO">
                <Typography sx={{fontSize: "1rem", fontWeight: "bold"}} className="title-card-desCO">
                  Thông tin liên hệ
                </Typography>
                <CardActionArea>
                <Box
                  sx={{
                    height: 50, 
                    width: "100%", 
                    background: "linear-gradient(to right,rgb(224, 35, 22),rgb(226, 61, 39),rgb(241, 130, 122))", 
                  }}
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
                  </CardContent>
                </CardActionArea>
              </Card></Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large" // Tăng kích thước
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1.2rem", // Chỉnh size chữ
                fontWeight: "bold", // Làm đậm số trang
                borderRadius: "8px", // Bo góc
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "#1976d2", // Màu nền khi được chọn
                color: "white", // Màu chữ
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              },
            }}
          />
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailCO;
