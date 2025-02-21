import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { LinkedIn, Facebook, YouTube, Phone, Email, Send } from "@mui/icons-material";
import logotong from "../../assets/images/logotong.png"

const Footer = () => {
  return (
<Box sx={{ mt:10, background: "linear-gradient(to right, #121212, #600)", color: "#fff", p: 4 }}>
  <Grid container spacing={4} justifyContent="space-between" sx={{width:1200 ,margin: "0 auto"}}  >
    {/* Cột 1: Logo & Social Media */}
    <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column" }}>
      <img 
        src={logotong} 
        alt="Logo" 
        style={{ height: 120 ,width:150}} // Giữ kích thước cân đối
      />
      <Box mt={2}  gap={1}>
        <IconButton sx={{ color: "#0A66C2" }}>
          <LinkedIn />
        </IconButton>
        <IconButton sx={{ color: "#0866FF" }}>
          <Facebook />
        </IconButton>
        <IconButton sx={{ color: "#FF0033" }}>
          <YouTube />
        </IconButton>
      </Box>
    </Grid>

    {/* Cột 2: About Us */}
    <Grid item xs={6} md={3} sx={{ display: "flex", flexDirection: "column" ,gap:1}}>
      <Typography variant="h6" fontWeight="bold" sx={{ color:"#DEDEDE"}}>About Us</Typography>
      {["Home", "About Us", "Contact Us", "FAQ"].map((text) => (
        <Typography key={text}   sx={{  color:"#A6A6A6" , fontSize:"0.8rem"}}>
          <Link href="#" underline="none" color="inherit">{text}</Link>
        </Typography>
      ))}
    </Grid>

    {/* Cột 3: Liên hệ */}
    <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column" ,gap:1}}>
      <Typography variant="body2" fontWeight="bold"  sx={{ color:"#DEDEDE"}}>Want to post a job? Contact us at:</Typography>
      <Typography sx={{  display: "flex", alignItems: "center", color:"#A6A6A6" , fontSize:"0.8rem"}} variant="body2">
        <Phone sx={{ mr:1}}/>  (+84) 977 460 519 
      </Typography>
      <Typography  sx={{  display: "flex", alignItems: "center", color:"#A6A6A6" , fontSize:"0.8rem"}} variant="body2">
        <Email sx={{ mr:1}}/> Email: love@itviec.com
      </Typography>
      <Typography  sx={{  display: "flex", alignItems: "center", color:"#A6A6A6" , fontSize:"0.8rem"}} variant="body2">
        <Send sx={{ mr:1}}/> <Link href="#" underline="none" color="inherit">Submit contact information</Link>
      </Typography>
    </Grid>
  </Grid>
</Box>

  );
};

export default Footer;
