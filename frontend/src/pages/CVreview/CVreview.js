import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import CO from "../../components/CO/CO";
import CV from "../../components/CV/CV";
import media from "../../assets/images/backgroundLog.jpg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authUtils";
import "./CVreview.css";
import ApplicationsService from "../../services/ApplicationsService";

const columns = [
  { field: "UserName", headerName: "Tên người dùng", width: 300 },
  { field: "CV", headerName: "CV", width: 350 },
  { field: "Time", headerName: "Thời gian nộp", width: 120 },
];

const CVreview = () => {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);



  const { idjob } = useParams();


  const handleClick = async () => {
    console.log(selectedIds);
    try {
      const res = await ApplicationsService.updateStatusApply(
        idjob,
        selectedIds,
        "seen",
        accessToken
      );
      console.log(res);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };

  React.useEffect(() => {
    const getALLjob = async () => {
      try {
        const res = await ApplicationsService.getByIDpostandStatus(
          idjob,
          "pending",
          accessToken
        );
        console.log(res);
        if (res && Array.isArray(res.data)) {
          // Chuyển đổi dữ liệu nếu cần
          const formattedData = res.data.map((item) => ({
            id: item._id,
            UserName: item.cvId.idUser.fullName || "Unknown",
            CV: item.cvId.linkfile || "No Email",
            titleCV: item.cvId.filetitle || "N/A",
            Time: item.createdAt || "False",
          }));
          setRows(formattedData);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getALLjob();
  }, []);

  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <Button
            variant="contained"
            sx={{
              fontSize: "20px",
              padding: "10px 30px",
            }}
            onClick={handleClick}
          >
            Đã xem
          </Button>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 8 },
              },
            }}
            pageSizeOptions={[8, 14]}
            checkboxSelection
            onRowSelectionModelChange={(ids) => setSelectedIds(ids)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CVreview;
