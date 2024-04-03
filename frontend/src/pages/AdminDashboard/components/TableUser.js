import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "UserName", headerName: "UserName", width: 200 },
  { field: "Email", headerName: "Email", width: 300 },
  { field: "DOB", headerName: "Date of Birth", width: 200 },
  { field: "Status", headerName: "Status", width: 160 },
];

const rows = [
  { id: 1, UserName: "Snow", Email: "Jon", Status: 35 },
  { id: 2, UserName: "Lannister", Email: "Cersei", Status: 42 },
  { id: 3, UserName: "Lannister", Email: "Jaime", Status: 45 },
  { id: 4, UserName: "Stark", Email: "Arya", Status: 16 },
  { id: 5, UserName: "Targaryen", Email: "Daenerys", Status: null },
  { id: 6, UserName: "Melisandre", Email: null, Status: 150 },
  { id: 7, UserName: "Clifford", Email: "Ferrara", Status: 44 },
  { id: 8, UserName: "Frances", Email: "Rossini", Status: 36 },
  { id: 9, UserName: "Roxie", Email: "Harvey", Status: 65 },
];

export default function TableUser() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
