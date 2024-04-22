import React,{useEffect, useState} from "react";
import axios from "axios";
import ButtonDialogFilter from "../../components/ButtonDialogFilter/ButtonDialogFilter";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import JobSummary from "../../components/JobSummary/JobSummary";
import DetailJobswift from "../../components/DetailJobswift/DetailJobswift";
import Banner from "../../components/Banner/Banner";
import "./FindJob.css";

const FindJob = () => {

  const [listjobs, setListjobs] =useState([])
  const [active,setActive] = useState(0)

  useEffect(() => {
    const getALLjob = async () => {
      try {
        const response  = await axios.get(`http://localhost:4000/api/post/getALLjob`);
        setListjobs(response.data.data)
        console.log(response.data.data)
      } catch(error) {
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    };
    getALLjob();
  },[])

  const showjobswift = (i)=>{
    setActive(i)
  }

  return (
    <Box sx={{ position: "relative"}}>
      <Box className="main">
        <Banner></Banner>
        <Box className="icontainer" sx={{ mt: 5}}>
          <Box
            display="flex"
            sx={{  display: "flex", justifyContent: "space-between" , alignItems:"center" }}
          >
            <Box sx={{alignItems:"center",display: "flex"}}>
              <input 
                id="basicInputSearch"
                placeholder="Nhập từ khóa Tên công ty, kỹ năng, chức vụ... "
              ></input>
              <Button
                variant="contained"
                sx={{
                  fontSize: "20px",
                  padding: "10px 30px",
                }}
              >
                <SearchIcon></SearchIcon> Tìm kiếm
              </Button>
            </Box>
            <ButtonDialogFilter></ButtonDialogFilter>
          </Box>
          <Box sx={{ mt: 3 }} display={"flex"}>
            <Box className="content-listjobs">
              {Array.isArray(listjobs) &&  listjobs.map((item, i)=>(
                <div key={i} onClick={()=>showjobswift(i)}>
                  <JobSummary job={item} ></JobSummary>

                </div>
              ))}
            </Box>
            <Box className="content-detailjob" >
                {listjobs && listjobs.length > 0 && (
                <DetailJobswift job={listjobs[active]}></DetailJobswift>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FindJob;
