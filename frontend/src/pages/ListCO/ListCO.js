import React,{useEffect, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import COsummary from "../../components/COsummary/COsummary";
import COService from "../../services/COService";
import "./ListCO.css";
import { useAuth  } from '../../utils/authUtils';

const ListCO = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth()
  const [page, setPage] = useState(1);
  const limit = 9;
  const [totalPages, setTotalPages] = useState(1);
  const [fetchData,setFetchData]=React.useState([])
  const [ownershipID,setOwnershipID]=React.useState()
  const [search,setSearch]= useState("");

  const getSearchCO = async (s,p) => {
    try {
      const res  = await COService.getAll(s,p,limit)
      setFetchData(res.data)
      setTotalPages(res.totalPages)
      setPage(p)
    } catch(error) {
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    }
  };


  useEffect(() => {
    getSearchCO("",1,limit)
    const getCObyUserID = async () => {
      try {
        const res  = await COService.getCObyuserID(accessToken)
        if(res){
          setOwnershipID(res.data._id)
        }
      } catch(error) {
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    };
    getCObyUserID();
  },[])

  return (
    <Box>
      <Box className="main" sx={{ mt: 5 }}>
        <Box className="icontainer">
          <Box
            display="flex"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value) }
                id="basicInputSearch"
                placeholder="Nhập từ khóa Tên công ty, Mã số thuế "
              ></input>
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  padding: "10px 30px",
                }}
                onClick={() => getSearchCO(search, 1)}
              >
                <SearchIcon></SearchIcon> Tìm kiếm
              </Button>
            </Box>
            {ownershipID &&
                <Button
                variant="contained"
                color="error"
                sx={{
                  fontSize: "14px",
                  padding: "10px 30px",
                }}
                onClick={() => navigate(`/home/DetailCO/${ownershipID}`)}
              >
                Công ty của tôi
                
              </Button>
            }
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography
              textAlign="center"
              gutterBottom
              sx={{fontSize: "1.5rem", fontWeight: "bold"}}
              component="div"
            >
              Danh sách công ty nổi bật
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {fetchData.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <COsummary CO={item}></COsummary>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => getSearchCO(search, value)}
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
  );
};

export default ListCO;
