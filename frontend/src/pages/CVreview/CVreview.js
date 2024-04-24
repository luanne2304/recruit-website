import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CO from "../../components/CO/CO";
import CV from "../../components/CV/CV";
import media from "../../assets/images/backgroundLog.jpg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CVreview.css";



  

const CVreview = () => {
    const [age, setAge] = React.useState('');
    const [fetchpost,setFetchpost] = React.useState()
    const [listCVs,setListCVs] = React.useState()

    const { idjob } = useParams();

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    React.useEffect(() => {

      const getALLjob = async () => {
        try {
          const response  = await axios.get(`http://localhost:4000/api/post/getDetailjob/${idjob}`);
          setFetchpost(response.data.data)
          const response2  = await axios.get(`http://localhost:4000/api/Applications/getApplyPendingbyPost/${idjob}`);
          setListCVs(response2.data.data)
          console.log(response2.data.data)
        } catch(error) {
          console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
        }
      };
      getALLjob();
    },[])

  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <CO data={fetchpost? fetchpost.CO:""}></CO>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
            <Box className="main-content-wrap">
              <Card sx={{ width: "100%" }} className="card-desCO">
                <Typography variant="h5" className="title-card-desCO">
                  Danh sách ứng viên
                </Typography>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="50"
                    image={media}
                    alt="green iguana"
                  />
                  <CardContent>
                    {listCVs && listCVs.map((item, index)=>(
                      <Box key={index} sx={{display:"flex" , alignItems:"center", justifyContent:"space-between"}}>
                      <Box sx={{width:"100%"}}><CV></CV></Box>
                      <Box sx={{ width: 160 , ml:3}}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Xếp loại
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Không đạt</MenuItem>
                            <MenuItem value={20}>Cân nhắc</MenuItem>
                            <MenuItem value={30}>Đạt</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      </Box>
                    ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box className="extra-content-wrap" sx={{ display:"flex",  flexDirection: 'column', alignItems:"center"}}>
              <ButtonGroup sx={{mt:2, mb:2}} variant="outlined" aria-label="Basic button group">
                <Button>Không đạt</Button>
                <Button>Cân nhắc</Button>
                <Button>Đã đạt</Button>
              </ButtonGroup>
              <Box sx={{width:"90%"}}>
                <CV></CV>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CVreview;
