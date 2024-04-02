import React from 'react'
import './SidebarLog.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import logo from '../../assets/images/logo.jpg'

const SidebarLog = () => {
  return (
    <Box className="sidebarlog" flexDirection="column">
      <img className='logo-sidebar' src={logo} alt="Logo" />
      <Box margin={9}>
        <h2>HL Developer - Nhà phát triển website cung cấp hệ sinh thái nhân sự</h2>
      </Box>
    </Box>
    )
}

export default SidebarLog