import React from "react";
import Box from '@mui/material/Box';
import Navbar from "../../components/Admin/Navbar";
import Slider from "../../components/Admin/Slider";
import TableUser from "./components/TableUser";
import CompanyManager from "./ReportManager";


export default function AdminDashboard() {
    const [open, setOpen] = React.useState(true);
  return (
    <Box> 
        <Navbar open={open} setOpen={setOpen}/>
        <Box sx={{display:"flex"}}>
            <Slider open={open} />
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{height:"80px"}} />
                <CompanyManager />
            </Box>
        </Box>

    </Box>
  );
}

