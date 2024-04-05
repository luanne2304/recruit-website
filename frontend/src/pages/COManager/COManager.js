import React from "react";
import { Typography, TextField, CardContent, Card, Box } from "@mui/material/";

const COManager = () => {
  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <Card sx={{ width: "100%", mt: 5 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                pl: 10,
                pr: 10,
              }}
            >
              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="h4"
                component="div"
              >
                Tạo bài đăng
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Tên công ty:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập tên công ty"
                  variant="outlined"
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Mô tả:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập mô tả công ty"
                  variant="outlined"
                  multiline
                  minRows={3}
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Link:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập link"
                  variant="outlined"
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  Mã số thuế:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập Mã số thuế"
                  variant="outlined"
                />
              </Typography>
              <Typography className="form-item">
                <Typography className="label-form" component="div">
                  IDusermanager:
                </Typography>
                <TextField
                  sx={{ width: "700px" }}
                  id="outlined-basic"
                  label="Nhập tài khoản quản lý"
                  variant="outlined"
                />
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default COManager;
