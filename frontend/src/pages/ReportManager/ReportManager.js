import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import ReportService from "../../services/ReportService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip, Snackbar, Alert, Avatar } from "@mui/material";
import { useAuth } from '../../utils/authUtils';



const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return moment(dateString).format("DD/MM/YYYY HH:mm:ss");
};

export default function ReportManager() {
      const { accessToken } = useAuth();
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const columns = [
    {
      field: "NameCo",
      headerName: "Tên Cty",
      width: 350,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar 
            src={params.row.logo} 
            alt={params.value} 
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          {params.value}
          <Tooltip title="Copy ID">
            <ContentCopyIcon 
              style={{ marginLeft: 10, color: "#1976d2", cursor: "pointer" }} 
              onClick={() => handleCopy(params.row.id)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      field: "NamePost",
      headerName: "Tiêu đề",
      width: 350,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value}
          <a
            href={`/home/DetailJob/${params.row.idpost}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: 10, color: "#1976d2", cursor: "pointer" }}
          >
            <VisibilityIcon />
          </a>
        </div>
      ),
    },
    { field: "fromID", headerName: "Người báo cáo", width: 250 },
    { field: "Des", headerName: "Mô tả", width: 400 },
    { field: "Time", headerName: "Thời gian", width: 150 },
  ];
  
const handleCopy = (text) => {
  navigator.clipboard.writeText(text)
};


  const handleSubmit = async () => {
    try {
      const res = await ReportService.updateStatus(selectedIds,accessToken);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await ReportService.getAll();
        if (res && Array.isArray(res.data)) {
          // Chuyển đổi dữ liệu nếu cần
          const formattedData = res.data.map((item) => ({
            id: item._id,
            idpost: item.idpost._id,
            idCO: item.idpost.CO._id,
            logo:item.idpost.CO.logo,
            NameCo: item.idpost.CO.name || "N/A",
            NamePost: item.idpost.title || "N/A",
            fromID: item.from.email || "N/A",
            Des: item.description || "N/A",
            Time: formatDate(item.createdAt) || "N/A",
          }));
          console.log(res.data);
          setRows(formattedData);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Button
        variant="contained"
        sx={{
          fontSize: "20px",
          padding: "10px 30px",
        }}
        onClick={handleSubmit}
      >
        Đã xem
      </Button>

      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          backgroundColor: "white", // Màu nền trắng
          color: "black", // Màu chữ đen
          "& .MuiDataGrid-cell": {
            color: "black", // Màu chữ trong ô
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5", // Màu nền tiêu đề cột
            color: "black",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "white", // Màu nền hàng
            "&:hover": {
              backgroundColor: "#f0f0f0", // Màu khi hover
            },
          }
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[8, 14]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => setSelectedIds(ids)}
      />
    </div>
  );
}
