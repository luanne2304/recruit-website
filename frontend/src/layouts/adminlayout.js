
import React from "react";
import Box from '@mui/material/Box';
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminSlider from "../components/AdminSlider/AdminSlider";
import { Outlet } from "react-router-dom";



export default function Adminlayout() {
    const [open, setOpen] = React.useState(true);
  return (
    <Box> 
        <AdminNavbar open={open} setOpen={setOpen}/>
        <Box sx={{display:"flex"}}>
            <AdminSlider open={open} />
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{height:"80px"}} />
                <Outlet />
            </Box>
        </Box>

    </Box>
  );
}

