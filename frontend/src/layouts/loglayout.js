import { Outlet } from "react-router-dom";
import React from 'react'
import SidebarLog from "../components/SidebarLog/SidebarLog";
import Box from '@mui/material/Box';

const Loglayout = () => {
  return (
    <Box display="flex" justifyContent="flex-end"  >
        <Outlet />
        <SidebarLog />
    </Box>
  )
}

export default Loglayout