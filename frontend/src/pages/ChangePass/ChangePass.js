import React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './ChangePass.css'

const ChangePass = () => {
  return (
    <Box>
      <Box className="main" sx={{mt: 15}}>
        <Box className="icontainer"  >
        <Box className="container-changepass">
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" component="div" sx={{m:'auto'}}>
            Cập nhật mật khẩu
        </Typography>
        </Box><Box sx={{ mt:3,display: "flex" , flexDirection: 'column' ,gap:4}}>
        <TextField id="outlined-basic" label="Mật khẩu hiện tại" variant="outlined" />
        <TextField id="outlined-basic" label="Mật khẩu mới" variant="outlined" />
        <TextField id="outlined-basic" label="Xác nhận lại mật khẩu" variant="outlined" />
        </Box>
        <Button sx={{ mt:4 , float:"right"}} variant="contained">Xác nhận</Button>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePass;
