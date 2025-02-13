import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import userService from "../../services/userService";
import COService from "../../services/COService";
import { useAuth} from "../../utils/authUtils";
import AdminReasonDialog from "../../components/AdminReasonDialog/AdminReasonDialog";
import AdminUpdateCODialog from "../../components/AdminUpdateCODialog/AdminUpdateCODialog";
import Button from "@mui/material/Button";

const columns = [
    { field: "NameCO", headerName: "Tên công ty", width: 500 },
    { 
      field: "Logo", 
      headerName: "Logo", 
      width: 150,
      renderCell: (params) => (
        params.value && params.value !== "No Logo" ? 
        <img src={params.value} alt="Logo" style={{ width: 80, height: 50, objectFit: "contain" }} /> 
        : "No Logo"
      ),
    },
    { field: "TaxCode", headerName: "Mã số thuế", width: 200 },
    { field: "Companysize", headerName: "Quy mô Cty", width: 200 },
    { field: "idaccount_manager", headerName: "Tài khoản quản lý", width: 300 },
    { field: "Status", headerName: "Trạng thái", width: 180 },
  ];


export default function COManager() {
  const navigate = useNavigate();
const [rows, setRows] = useState([]);
const [selectedIds, setSelectedIds] = useState();
const [status, setStatus] = useState(true);
const [isOpenDialogStatus, SetIsOpenDialogStatus] = useState(false);
const [isOpenDialogUpdateIDacc, SetIsOpenDialogUpdateIDacc] = useState(false);

  const handleDisable = async () => {
    SetIsOpenDialogStatus(true)
    setStatus(false)
  };

  const handleEnable = async () => {
    SetIsOpenDialogStatus(true)
    setStatus(true)
  };
  
  const handleUpdateIDacc = async () => {
    SetIsOpenDialogUpdateIDacc(true)
  };

  const handleSubmitIdacc = async (idacc) => {
    try {
      const res = await COService.updateIdaccountCO(selectedIds,idacc);  
        console.log(res)
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };

  const handleSubmitStatus = async (reason) => {
    try {
      const res = await COService.updateStatus(selectedIds,status,reason);  
        console.log(res)
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };

  const fetchCO = async () => {
    try {
        const res = await COService.getAll();
        if (res && Array.isArray(res.data)) {
        // Chuyển đổi dữ liệu nếu cần
          const formattedData = res.data.map((CO) => ({
            id: CO._id ,
            NameCO: CO.name || "Unknown",
            Logo: CO.logo || "No Logo",
            TaxCode: CO.taxcode || "N/A",
            Companysize: CO.scalefrom +" - "+ CO.scaleto + " nhân viên" || "N/A",
            idaccount_manager: CO.idaccount_manager  || "N/A",
            Status: CO.status ,
          }));
          setRows(formattedData); 
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    }

  useEffect(() => {
      fetchCO();
    },[]);
  return (
    <div style={{  width: "100%" }}>
        <AdminUpdateCODialog setOpen={SetIsOpenDialogUpdateIDacc} open={isOpenDialogUpdateIDacc}  onSubmit={handleSubmitIdacc}></AdminUpdateCODialog>
        <AdminReasonDialog setOpen={SetIsOpenDialogStatus} open={isOpenDialogStatus}  onSubmit={handleSubmitStatus}></AdminReasonDialog>
      
      <Button
        variant="contained"
        sx={{
          fontSize: "20px",
          padding: "10px 30px",
        }}
        onClick={handleDisable}
      >
        Khóa hoạt động
      </Button>
      <Button
        variant="contained"
        sx={{
          fontSize: "20px",
          padding: "10px 30px",
        }}
        onClick={handleEnable}
      >
        Mở hoạt động
      </Button>
      <Button
        variant="contained"
        sx={{
          fontSize: "20px",
          padding: "10px 30px",
        }}
        onClick={handleUpdateIDacc}
      >
        Cập nhật lại tài khoản quản lý
      </Button>
      <Button
        variant="contained"
        sx={{
          fontSize: "20px",
          padding: "10px 30px",
        }}
        onClick={() => navigate(`/admin/CreateCO`)}
      >
        Thêm công ty
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[ 8,14]}
        checkboxSelection
        disableMultipleRowSelection 
        onRowSelectionModelChange={(ids) => setSelectedIds(ids)}
      />
    </div>
  );
}
