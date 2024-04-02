import { Outlet } from "react-router-dom";
import React from 'react'
import NavBarHome from "../components/NavBarHome/NavBarHome";
import Box from '@mui/material/Box';

const Homelayout = () => {
  return (
    <Box>
        <NavBarHome />
        <Outlet />
    </Box>
  )
}

export default Homelayout