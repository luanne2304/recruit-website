import React, { useState } from 'react'
import axios from 'axios';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import COjob from '../../components/COjob/COjob';

const CVapplied = () => {

  const [fetchData,setFetchData]=useState([])

  React.useEffect(()=>{
    const getALLjob = async () => {
      try {
        const response  = await axios.get(`http://localhost:4000/api/user/getCVsAppliedbyUser`,{     
          params: {
            iduser: "660cfd11a53d71f4940dcc55"
        } 
      });
        setFetchData(response.data.data)

      } catch(error) {
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    };
    getALLjob();
  })

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
                      <COjob data={item.post}></COjob>
                      <Box sx={{ width:"30%",display:"flex" ,gap:2,justifyContent:"center"}}>
                      <Typography variant="h6">Phản hồi:</Typography>
                      <Typography variant="h6">{(item.apply.status=="pending")?"Chưa có":item.apply.status }</Typography>
                      </Box>
                    </Box>
                    ))}

                </CardContent>
            </Card>
        </Box>
        </Box>
    </Box>
  )
}

export default CVapplied