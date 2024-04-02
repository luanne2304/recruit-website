import React from 'react'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import COjob from '../../components/COjob/COjob';

const CVapplied = () => {
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
                    <Box sx={{display:"flex", alignItems:"center",justifyContent:"space-between"}}>
                    <COjob></COjob>
                    <Box sx={{ width:"30%",display:"flex" ,gap:2,justifyContent:"center"}}>
                    <Typography variant="h6">Phản hồi:</Typography>
                    <Typography variant="h6">Chưa có</Typography>
                    </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
        </Box>
    </Box>
  )
}

export default CVapplied