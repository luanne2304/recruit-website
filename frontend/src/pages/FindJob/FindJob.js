import React from "react";
import ButtonDialogFilter from "../../components/ButtonDialogFilter/ButtonDialogFilter";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import JobSummary from "../../components/JobSummary/JobSummary";
import DetailJobswift from "../../components/DetailJobswift/DetailJobswift";
import Banner from "../../components/Banner/Banner";
import "./FindJob.css";

const FindJob = () => {
  return (
    <Box>
      <Box className="main">
        <Banner></Banner>
        <Box className="icontainer" sx={{ mt: 5 }}>
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
              <JobSummary></JobSummary>
            </Box>
            <Box className="content-detailjob">
              <DetailJobswift></DetailJobswift>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FindJob;
