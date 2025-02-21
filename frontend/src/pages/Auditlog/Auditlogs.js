import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import AuditLogsService from "../../services/AuditLogsService";
import { useAuth } from "../../utils/authUtils";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return moment(dateString).format("DD/MM/YYYY HH:mm:ss");
};

export default function AuditLogs() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "userEmail", headerName: "Người thực hiện", width: 250 },
    { field: "action", headerName: "Hành động", width: 150 },
    { field: "tableName", headerName: "Bảng", width: 100 },
    { field: "recordIds", headerName: "Bản ghi ảnh hưởng", width: 280 },
    { field: "reason", headerName: "Lý do", width: 350 },
    { field: "timestamp", headerName: "Thời gian", width: 220 },
  ];

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const res = await AuditLogsService.getAll(accessToken);
        if (res && Array.isArray(res.data)) {
          const formattedData = res.data.map((log) => ({
            id: log._id,
            userEmail: log.userId?.email || "Unknown",
            action: log.action || "N/A",
            tableName: log.tableName || "N/A",
            recordIds: log.recordIds?.join(", ") || "N/A",
            reason: log.reason || "N/A",
            timestamp: formatDate(log.timestamp),
          }));
          setRows(formattedData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy Audit Logs:", error);
      }
    };

    fetchAuditLogs();
  }, []);

  return (
    <div style={{ width: "100%" }}>
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
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
}
