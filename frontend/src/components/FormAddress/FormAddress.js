import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Autocomplete,
  Box,
  Chip,
  Button,
  Paper,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import { convertLength } from "@mui/material/styles/cssUtils";

const FormAddress = ({ setAddress, address }) => {

  const [loadListaddress, setLoadListaddress] = useState([]);
  const [listaddress, setListaddress] = useState([]);

  const [fetchTP, setFetchTP] = useState([]);
  const [fetchQH, setFetchQH] = useState([]);
  const [fetchPX, setFetchPX] = useState([]);
  const [tree, setTree] = useState();

  const handleDeleteAddress = (id) => {

    

    const newLoadListAddress = [...loadListaddress];
    // console.log(typeof(newLoadListAddress))
    newLoadListAddress.splice(id, 1)
    // console.log(newLoadListAddress)
    // const newLoadListAddress = loadListaddress.filter((_, index) => index !== id);
    // console.log(newLoadListAddress)
    setLoadListaddress(newLoadListAddress);

    const newListAddress = [...listaddress];
    newListAddress.splice(id, 1);
    // const newListAddress = listaddress.filter((_, index) => index !== id);
    setListaddress(newListAddress);
  };

  const addChip = () => {
    console.log(address);
    console.log(listaddress);
    // setAddress({
    //   district: null,
    //   ward: null,
    //   city: null,
    //   streetnumber: "",
    // })
    setListaddress(prevList => [...prevList, address]);
    setLoadListaddress([
      ...loadListaddress,
      <TableRow>
        <TableCell component="th" scope="row">
          Số: 
          {address.streetnumber}, P/X:
          {address.ward.label}, Q/H:
          {address.district.label}, TP/Tỉnh:
          {address.city.label}
        </TableCell>
        <TableCell align="right">
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>handleDeleteAddress(loadListaddress.length)}>
            Xóa
          </Button>
        </TableCell>
      </TableRow>
    ]);
  };

  const handleChangeTP = (event, value) => {
    if (value) {
      const provinceData = tree[value.code];
      let tempQH = [];
      for (const QHCode in provinceData["quan-huyen"]) {
        if (provinceData["quan-huyen"].hasOwnProperty(QHCode)) {
          const district = provinceData["quan-huyen"][QHCode];
          // Lấy tên và mã của quận huyện và thêm vào biến districtData
          const label = district.name;
          const code = district.code;
          const parent_code = district.parent_code;
          tempQH.push({ label, code, parent_code });
        }
      }
      setAddress({ district: null, ward: null, city: value });
      setFetchQH(tempQH);
    }
  };

  const handleChangeQH = (event, value) => {
    if (value) {
      const provinceData = tree[value.parent_code]["quan-huyen"][value.code];
      let tempPX = [];
      for (const PXCode in provinceData["xa-phuong"]) {
        if (provinceData["xa-phuong"].hasOwnProperty(PXCode)) {
          const px = provinceData["xa-phuong"][PXCode];
          // Lấy tên và mã của quận huyện và thêm vào biến districtData
          const label = px.name;
          const code = px.code;
          tempPX.push({ label, code });
        }
      }
      setAddress({ ...address, district: value, ward: null });
      setFetchPX(tempPX);
    }
  };

  useEffect(() => {
    const calltp = async () => {
      try {
        let tempCity = [];
        const res = await axios.get(`http://localhost:4000/api/getTree`);
        setTree(res.data);
        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            const code = res.data[key].code;
            const label = res.data[key].name;
            tempCity.push({ label, code });
          }
        }
        setFetchTP(tempCity);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    calltp();
    console.log(address.streetnumber);
  }, []);
  return (
    <>
      <Typography className="form-item">
        <Typography className="label-form" component="div">
          Địa chỉ:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={address.city}
              options={fetchTP}
              onChange={handleChangeTP}
              sx={{ width: 210 }}
              renderInput={(params) => (
                <TextField {...params} label="Tỉnh / TP" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchQH}
              value={address.district}
              onChange={handleChangeQH}
              sx={{ width: 210 }}
              renderInput={(params) => (
                <TextField {...params} label="Quận / Huyện" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={fetchPX}
              value={address.ward}
              onChange={(event, value) => {
                setAddress({ ...address, ward: value });
              }}
              sx={{ width: 210 }}
              renderInput={(params) => (
                <TextField {...params} label="Phường / Xã" />
              )}
            />
          </Box>
          <TextField
            sx={{ width: "700px" }}
            id="outlined-basic"
            label="Nhập địa chỉ"
            variant="outlined"
            name="title"
            value={address.streetnumber}
            onChange={(e) =>
              setAddress({ ...address, streetnumber: e.target.value })
            }
          />
          <Button variant="contained" onClick={addChip}>
            Thêm
          </Button>
        </Box>
      </Typography>
      <Typography
        className="form-item"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>Bảng danh sách địa chỉ của công ty</caption>
            <TableHead>
              <TableRow>
                <TableCell>Địa chỉ các cơ sở</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadListaddress}
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </>
  );
};

export default FormAddress;
