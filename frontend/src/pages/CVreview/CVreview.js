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
    const [fetchpost,setFetchpost] = React.useState()
    const [listCVsPending,setListCVsPending] = React.useState()
    const [listCVsbyStatus,setListCVsbyStatus] = React.useState()
    const [processedCVs,setProcessedCVs]=React.useState([])

    const { idjob } = useParams();

    const handleChange = (event) => {
      const existingCVIndex = processedCVs.findIndex(cv => cv.cv === event.target.name);
      if (existingCVIndex !== -1) {
        // Nếu đã tồn tại, cập nhật giá trị result của cv đó
        const updatedCVs = [...processedCVs];
        updatedCVs[existingCVIndex] = { ...updatedCVs[existingCVIndex], result: event.target.value };
        setProcessedCVs(updatedCVs);
      } else {
        setProcessedCVs([...processedCVs, { cv: event.target.name, result: event.target.value }]);
      }
    };

    const test = async()=>{
      if(processedCVs.length==0){
        return
      }
      await axios.put(`http://localhost:4000/api/Applications/updateStatusApply`,{processedCVs:processedCVs});
    }

    const showCVsbyStatus=async (event)=>{
      const response  = await axios.get(`http://localhost:4000/api/Applications/getApplyPostByStatus`,{params:{idpost:idjob,status:event.target.name}});
      setListCVsbyStatus(response.data.data)
    }

    React.useEffect(() => {

      const getALLjob = async () => {
        try {
          const response  = await axios.get(`http://localhost:4000/api/post/getDetailjob/${idjob}`);
          setFetchpost(response.data.data)
          const response2  = await axios.get(`http://localhost:4000/api/Applications/getApplyPendingbyPost/${idjob}`);
          setListCVsPending(response2.data.data)
          // const response3  = await axios.get(`http://localhost:4000/api/Applications/getApplyPostByStatus`,{params:{idpost:idjob,status:}});
          // setListCVsbyStatus(response3.data.data)
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
                    {listCVsPending && listCVsPending.map((item, index)=>(
                      <Box key={index} sx={{mt:2 ,display:"flex" , alignItems:"center", justifyContent:"space-between"}}>
                      <Box sx={{width:"100%"}}>
                        <CV title={item.cvId.filetitle} link={item.cvId.linkfile} id={item.cvId._id}></CV>
                        </Box>
                      <Box sx={{ width: 160 , ml:3}}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Xếp loại
                          </InputLabel>
                          <Select
                            label="Xếp loại"
                            labelId="demo-simple-select-label"
                            name={item._id}
                            defaultValue=""
                            onChange={handleChange}
                          >
                            <MenuItem value="Không đạt">Không đạt</MenuItem>
                            <MenuItem value="Cân nhắc">Cân nhắc</MenuItem>
                            <MenuItem value="Đạt">Đạt</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      </Box>
                    ))}
                    <Button onClick={test} sx={{float:"right", margin: 2}} variant="contained">Xác nhận</Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box className="extra-content-wrap" sx={{ display:"flex",  flexDirection: 'column', alignItems:"center"}}>
              <ButtonGroup sx={{mt:2, mb:2}} variant="outlined" aria-label="Basic button group">
                <Button name="Không đạt" onClick={showCVsbyStatus}>Không đạt</Button>
                <Button name="Cân nhắc" onClick={showCVsbyStatus}>Cân nhắc</Button>
                <Button name="Đạt" onClick={showCVsbyStatus}>Đã đạt</Button>
              </ButtonGroup>
              <Box sx={{width:"90%"}}>
              {listCVsbyStatus && listCVsbyStatus.map((item, index)=>(
                <Box key={index}>
                 <CV title={item.cvId.filetitle} link={item.cvId.linkfile} id={item.cvId._id}></CV>
                </Box>
              ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CVreview;
