import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonDialogFilter from "../../components/ButtonDialogFilter/ButtonDialogFilter";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import JobSummary from "../../components/JobSummary/JobSummary";
import DetailJobswift from "../../components/DetailJobswift/DetailJobswift";
import Banner from "../../components/Banner/Banner";
import userService from "../../services/userService";
import { useAuth } from "../../utils/authUtils";
import postService from "../../services/postService";
import "./FindJob.css";

const FindJob = () => {
  const { accessToken } = useAuth();

  const [page, setPage] = useState(1);
  const limit = 4;
  const [totalPages, setTotalPages] = useState(1);
  const [listjobs, setListjobs] = useState([]);
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState(false);
  const [search, setSearch] = useState("");

  const showjobswift = (i) => {
    setActive(i);
  };

  const getFilterjob = async (data, p) => {
    try {
      if (p === undefined) p = 1;
      const res = await postService.getFilterjob(data, p, limit);
      setListjobs(res.data);
      setTotalPages(res.totalPages);
      setPage(p);
      setActive(0)
      setStatusFilter(true);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };

  const getSearchjob = async (s, p) => {
    try {
      const res = await postService.getSearchjob(s, p, limit);
      setListjobs(res.data);
      setTotalPages(res.totalPages);
      setActive(0)
      setPage(p);
      setStatusFilter(false);
      console.log(res);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };
  useEffect(() => {
    if (statusFilter) {
      getFilterjob(filter, page);
    } else {
      getSearchjob(search, page);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Box className="main">
        <Banner></Banner>
        <Box className="icontainer" sx={{ mt: 5 }}>
          <Box
            display="flex"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{  alignItems: "center", display: "flex" }}>
              <OutlinedInput
              sx={{width:450, mr:2, backgroundColor:"#ffffff"}}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
             
                placeholder="Nhập từ khóa Tên công ty, kỹ năng, chức vụ... "
              />

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
            </Box>
            <ButtonDialogFilter
              setFilter={setFilter}
              handleFilter={getFilterjob}
            ></ButtonDialogFilter>
          </Box>
          <Box sx={{ mt: 3 }} display={"flex"}>
            {listjobs.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px", // Điều chỉnh chiều cao cho phù hợp
                  fontSize: "1.5rem", // Tăng kích thước chữ
                  fontWeight: "bold", // Làm đậm chữ
                  color: "gray",
                  textAlign: "center",
                }}
              >
                Không có bài đăng tương thích
              </Box>
            ) : (
              <>
                <Box className="content-listjobs">
                  {listjobs.map((item, i) => (
                    <Box
                      component="div"
                      key={i}
                      onClick={() => showjobswift(i)}
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        borderRadius: 4,
                        mr: 2,
                        mb: 2,
                        border:
                          active === i
                            ? "2px solid #1976d2"
                            : "2px solid transparent", // Bo viền khi chọn
                        backgroundColor:
                          active === i ? "#E3F2FD" : "transparent", // Nền xanh nhẹ khi chọn
                        "&:hover": {
                          backgroundColor: "#BBDEFB", // Hover có màu xanh nhạt
                          transform: "scale(1.02)", // Phóng to nhẹ
                        },
                      }}
                    >
                      <JobSummary job={item} />
                    </Box>
                  ))}
                </Box>
                <Box className="content-detailjob">
                  {listjobs && listjobs.length > 0 && (
                    <DetailJobswift job={listjobs[active]}></DetailJobswift>
                  )}
                </Box>{" "}
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large" // Tăng kích thước
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1.2rem", // Chỉnh size chữ
                fontWeight: "bold", // Làm đậm số trang
                borderRadius: "8px", // Bo góc
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "#1976d2", // Màu nền khi được chọn
                color: "white", // Màu chữ
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FindJob;
