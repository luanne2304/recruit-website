import React, { useState } from 'react'
import moment from "moment"
import axios from 'axios';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import COjob from '../../components/COjob/COjob';
import CV from '../../components/CV/CV';
import { useAuth } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import ApplicationsService from '../../services/ApplicationsService';

const CVapplied = () => {
  const { accessToken } = useAuth();
    const [page, setPage] = useState(1);
    const limit = 1;
    const [totalPages, setTotalPages] = useState(1);
  const [fetchData,setFetchData]=useState([])

  const getAllApplied = async (p) => {
    try {
      const res  = await ApplicationsService.getCVsAppliedbyUser(accessToken,p,limit) 
      console.log(res)
      setFetchData(res.data)
      setTotalPages(res.totalPages)
      setPage(p)
    } catch(error) {
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    }
  };

  React.useEffect(()=>{
    getAllApplied(1)
  },[])

  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1000px", mt: 8 }}>
        <Card sx={{ width: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <Typography variant="h6">
                      Các công việc đã ứng tuyển
                    </Typography>
                    {fetchData && fetchData.map((item,index)=>(
                      <Box key={index} sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                      <COjob data={item.post} ></COjob>
                      <Box sx={{ width:"30%",display:"flex" ,gap:2,justifyContent:"center"}}>
                      <Typography variant="h6">Ngày nộp: {moment(item.apply.createat).format('DD/MM/YYYY')}</Typography>
                      <Typography variant="h6">Hồ sơ:</Typography>
                      <CV title={item.user_cv.filetitle} id={item.user_cv._id} link={item.user_cv.linkfile}></CV>
                      </Box>
                    </Box>
                    ))}

                </CardContent>
            </Card>
                <Pagination
                count={totalPages} // Tổng số trang
                page={page} // Trang hiện tại
                onChange={(event, value) => getAllApplied( value)}
                color="primary"
              />
        </Box>
        </Box>
    </Box>
  )
}

export default CVapplied