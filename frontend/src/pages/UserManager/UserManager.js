import React,{useEffect, useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import userService from "../../services/userService";
import AdminReasonDialog from "../../components/AdminReasonDialog/AdminReasonDialog";
import Button from "@mui/material/Button";
import { useAuth  } from '../../utils/authUtils';

const columns = [
  { field: "UserName", headerName: "Tên người dùng", width: 300 },
  { field: "Email", headerName: "Email", width: 350 },
  { field: "IsAdmin", headerName: "IsAdmin", width: 120 },
  { field: "Status", headerName: "Trạng thái", width: 400 },
  { field: "PhoneNumber", headerName: "SDT", width: 180 },
];


export default function UserManager() {
 const { accessToken } = useAuth();
const [rows, setRows] = useState([]);
const [selectedIds, setSelectedIds] = useState([]);
const [status, setStatus] = useState(true);
const [isOpenDialogStatus, SetIsOpenDialogStatus] = useState(false);

const handleDisable = async () => {
  SetIsOpenDialogStatus(true)
  setStatus(false)
};

const handleEnable = async () => {
  SetIsOpenDialogStatus(true)
  setStatus(true)
};

const handleSubmit = async (reason) => {
  console.log(selectedIds)
  try {
    const res = await userService.updateStatus(selectedIds,status,reason,accessToken);  
      console.log(res)
  } catch (error) {
    console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
  }
};

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const res = await userService.getAllUser();
            if (res && Array.isArray(res.data)) {
              // Chuyển đổi dữ liệu nếu cần
              const formattedData = res.data.map((user) => ({
                id: user._id ,
                UserName: user.fullName || "Unknown",
                Email: user.email || "No Email",
                PhoneNumber: user.sdt || "N/A",
                IsAdmin: user.isAdmin || "False",
                Status: user.status || "N/A", // Nếu null thì hiển thị "N/A"
              }));
              console.log(formattedData)
              setRows(formattedData); 
            }
          } catch (error) {
            console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
          }
        }
        fetchUsers();
    },[]);
  return (
    <div style={{  width: "100%" }}>
      <AdminReasonDialog setOpen={SetIsOpenDialogStatus} open={isOpenDialogStatus}  onSubmit={handleSubmit}></AdminReasonDialog>
      <Button
        variant="contained"
        sx={{
          fontSize: "20px",
          padding: "10px 30px",
        }}
        onClick={handleDisable}
      >
        Khóa tài khoản
      </Button>
      <Button
        variant="contained"
        sx={{
          fontSize: "20px",
          padding: "10px 30px",
        }}
        onClick={handleEnable}
      >
        Mở lại tài khoản
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
        pageSizeOptions={[ 8,14]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => setSelectedIds(ids)}
      />
    </div>
  );
}
