import React,{useState,useEffect} from "react";
import axios from "axios";
import {
    Typography,
    TextField,
    Autocomplete,
  
  } from "@mui/material/";

const FormAddress = ({setFetchTP,fetchTP,setFetchQH,fetchQH,setFetchPX,fetchPX,tree}) => {

    const handleChangeTP = (event, value) => {
        if (value) {
          const provinceData = tree[value.code];
          let tempQH =[]
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
        //   setFormData({...formData,district:null,ward:null,city:value})
          setFetchQH(tempQH)
          console.log(tempQH)
        }
      };
    
      const handleChangeQH = (event, value) => {
        if (value) {
          const provinceData = tree[value.parent_code]["quan-huyen"][value.code];
          let tempPX =[]
          for (const PXCode in provinceData["xa-phuong"]) {
            if (provinceData["xa-phuong"].hasOwnProperty(PXCode)) {
              const px = provinceData["xa-phuong"][PXCode];
              // Lấy tên và mã của quận huyện và thêm vào biến districtData
              const label = px.name;
              const code = px.code;
              tempPX.push({ label, code });
            }
          }
        //   setFormData({...formData,ward:null,district: value})
          setFetchPX(tempPX)
          console.log(tempPX)
        }
      };

  return (
    <>
      <Typography className="form-item">
        <Typography className="label-form" component="div">
          TP
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
        //   value={formData.city}
          options={fetchTP}
          onChange={handleChangeTP}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Tỉnh / TP" />}
        />
      </Typography>
      <Typography className="form-item">
        <Typography className="label-form" component="div">
          Q
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={fetchQH}
        //   value={formData.district}
          onChange={handleChangeQH}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Quận / Huyện" />
          )}
        />
      </Typography>
      <Typography className="form-item">
        <Typography className="label-form" component="div">
          p
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={fetchPX}
            // value={formData.ward}
          onChange={(event, value) => {
            // setFormData({ ...formData, ward: value });
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Phường / Xã" />
          )}
        />
      </Typography>
    </>
  );
};

export default FormAddress;
