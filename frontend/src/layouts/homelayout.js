import { Outlet } from "react-router-dom";
import React from 'react'
import NavBarHome from "../components/NavBarHome/NavBarHome";
import Footer from "../components/Footer/Footer";
import Box from '@mui/material/Box';

const Homelayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ flex: 1 }}>
          <NavBarHome />
          <Outlet />
      </Box>
      <Footer/>
    </Box>
  )
}

export default Homelayout