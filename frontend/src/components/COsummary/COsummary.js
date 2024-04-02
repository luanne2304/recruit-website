import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import thumbnail from '../../assets/images/logo.jpg'
import logo from '../../assets/images/logocty.jpg'
import { CardActionArea } from '@mui/material';
import './COsummary.css'

const COsummary = () => {
  return (
    <Card className='card-COsummary' sx={{ width: "100" }}>
        <img src={logo} className='logo-COsummary'/>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={thumbnail}
          alt="green iguana"
        />
        <CardContent sx={{mt:4}}>
          <Typography gutterBottom variant="h5" component="div">
          Công ty TNHH ITECHWX
          </Typography>
          <Typography variant="body2" color="text.secondary">
          " Thừa hưởng năng lực mạnh mẽ từ hơn 20 năm hoạt động tại Trung Quốc và các nước lớn trên thế giới như Mỹ, Nhật Bản – iTechwx được thành lập tại Việt Nam vào giữa cuối năm 2022 để tiếp nối sứ mệnh là một Contact Center và IT Services Center cho một trong những tập đoàn công nghệ hàng đầu thế giới - Microsoft. iTechwx hỗ trợ khách..."
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default COsummary