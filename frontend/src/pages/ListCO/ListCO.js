import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import COsummary from "../../components/COsummary/COsummary";
import "./ListCO.css";

const ListCO = () => {
  return (
    <Box>
      <Box className="main" sx={{ mt: 5 }}>
        <Box className="icontainer">
          <Box
            display="flex"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <input
                id="basicInputSearch"
                placeholder="Nhập từ khóa Tên công ty, Mã số thuế "
              ></input>
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  padding: "10px 30px",
                }}
              >
                <SearchIcon></SearchIcon> Tìm kiếm
              </Button>
            </Box>
            <Button
              variant="contained"
              color="error"
              sx={{
                fontSize: "14px",
                padding: "10px 30px",
              }}
            >
              Công ty của tôi
            </Button>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography
              textAlign="center"
              gutterBottom
              variant="h3"
              component="div"
            >
              Danh sách công ty nổi bật
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <COsummary></COsummary>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListCO;
