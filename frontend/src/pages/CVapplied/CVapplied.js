import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import COjob from "../../components/COjob/COjob";
import CV from "../../components/CV/CV";
import { useAuth } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import ApplicationsService from "../../services/ApplicationsService";

const CVapplied = () => {
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 2;
  const [totalPages, setTotalPages] = useState(1);
  const [fetchData, setFetchData] = useState([]);
  const [open, setOpen] = useState(false);

  const getAllApplied = async (p) => {
    try {
      const res = await ApplicationsService.getCVsAppliedbyUser(
        accessToken,
        p,
        limit
      );
      console.log(res);
      setFetchData(res.data);
      setTotalPages(res.totalPages);
      setPage(p);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };

  React.useEffect(() => {
    getAllApplied(1);
  }, []);

  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1000px", mt: 8 }}>
          <Card sx={{ width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography sx={{ fontSize: "1.27rem", fontWeight: "bold" }}>
                Các công việc đã ứng tuyển
              </Typography>
              {fetchData &&
                fetchData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* COjob chiếm 60% */}
                    <Box sx={{ flex: 6 }}>
                      <COjob data={item.post} />
                    </Box>

                    {/* Thời gian và Hồ sơ chiếm 40% */}
                    <Box
                      sx={{
                        ml: 2,
                        flex: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body1">
                        Ngày nộp:{" "}
                        {moment(item.apply.createat).format("DD/MM/YYYY")}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="body1" sx={{ width: 70 }}>
                          Hồ sơ:
                        </Typography>
                        <CV
                          title={item.user_cv.filetitle}
                          id={item.user_cv._id}
                          link={item.user_cv.linkfile}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
            </CardContent>
          </Card>{" "}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
            <Pagination
              count={totalPages} // Tổng số trang
              page={page} // Trang hiện tại
              onChange={(event, value) => getAllApplied(value)}
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
    </Box>
  );
};

export default CVapplied;
