import React,{useEffect, useState} from "react";
import axios from "axios";
import ButtonDialogFilter from "../../components/ButtonDialogFilter/ButtonDialogFilter";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@mui/material/Pagination";
import JobSummary from "../../components/JobSummary/JobSummary";
import DetailJobswift from "../../components/DetailJobswift/DetailJobswift";
import Banner from "../../components/Banner/Banner";
import userService from "../../services/userService";
import { useAuth  } from '../../utils/authUtils';
import postService from "../../services/postService";
import "./FindJob.css";

const FindJob = () => {
  
  const { accessToken } = useAuth()

  const test= async ()=>{
      try{
      const res = await userService.testUser(accessToken);
      } catch(error){
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    }

  const [page, setPage] = useState(1);
  const limit = 1;
  const [totalPages, setTotalPages] = useState(1);
  const [listjobs, setListjobs] =useState([])
  const [active,setActive] = useState(0)
  const [filter,setFilter]=useState([])
  const [statusFilter,setStatusFilter]= useState(false);
  const [search,setSearch]= useState("");
  
  const showjobswift = (i)=>{
    setActive(i)
  }

  const getFilterjob = async (data,p) => {
    try {
      if(p===undefined)
        p=1
      const res  = await postService.getFilterjob(data,p,limit)
      setListjobs(res.data)
      setTotalPages(res.totalPages)
      setPage(p)
      setStatusFilter(true)
    } catch(error) {
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    }
  };

  const getSearchjob = async (s,p) => {
    try {
      const res  = await postService.getSearchjob(s,p,limit)
      setListjobs(res.data)
      setTotalPages(res.totalPages)
      setPage(p)
      setStatusFilter(false)
    } catch(error) {
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    }
  };
  useEffect(() => {    

    if(statusFilter){
      getFilterjob(filter,page)
    }
    else{
      getSearchjob(search,page)
    }
}, [page])

  useEffect(() => {
    getSearchjob("",1)
  },[])


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
                value={search}
                 onChange={(event) => setSearch(event.target.value) }
                id="basicInputSearch"
                placeholder="Nhập từ khóa Tên công ty, kỹ năng, chức vụ... "
              ></input>
              <Button
                variant="contained"
                sx={{
                  fontSize: "20px",
                  padding: "10px 30px",
                }}
                onClick={() => getSearchjob(search, 1)}
              >
                <SearchIcon></SearchIcon> Tìm kiếm
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: "20px",
                  padding: "10px 30px",
                }}
                onClick={test}
              >
            TestUser
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: "20px",
                  padding: "10px 30px",
                }}
              >
                TestAdmin
              </Button>
            </Box>
            <ButtonDialogFilter setFilter={setFilter} handleFilter={getFilterjob}></ButtonDialogFilter>
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
                <DetailJobswift  job={listjobs[active]}></DetailJobswift>
              )}
            </Box>
          </Box>
        </Box>
        <Pagination
        count={totalPages} // Tổng số trang
        page={page} // Trang hiện tại
        onChange={(event, value) => setPage(value) }
        color="primary"
      />
      </Box>
    </Box>
  );
};

export default FindJob;
