import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import EditorField from "../../components/EditorField/EditorField";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../../utils/authUtils';
import postService from "../../services/postService";
import dayjs from 'dayjs';
import CO from "../../components/CO/CO";
import "./CurdPost.css";
import COService from "../../services/COService";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CurdPost = () => {
  const { idCO ,idjob} = useParams();
  const { accessToken } = useAuth()
  const [fetchco, setFetchco] = useState();

  const [loadjob, setLoadjob] = useState(false);

  const [addressDefault,setAddressDefault]= useState()
  const [selectDefault,setSelectDefault]=useState("")

  const defaultFormData = {
    title: "",
    des: "",
    require: "",
    benefit: "",
    address: null,
    form: "",
    salaryto: "",
    salaryfrom: "",
    duration: null,
    skill: [],
    skillformat: [],
    exp: [],
    expformat: [],
    CO: idCO,
  };

  const [formData, setFormData] = useState({
    title: "",
    des: "",
    require: "",
    benefit: "",
    address: null,
    form: "",
    salaryto: "",
    salaryfrom: "",
    duration: null,
    skill: [],
    skillformat: [],
    exp: [],
    expformat: [],
    CO: idCO,
  });

  const isOptionEqualToValue = (option, value) => {
    if (!value) {
      return false;
    }
    return option === value;
  };

  const handleChange = (event) => {
    // setFormData({ ...formData, [fieldName]: event.target.value });
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setFormData({ ...formData,  [e.target.name]: value });
    }
  };

  const handleAddressChange = (event) => {
    // setFormData({ ...formData, [fieldName]: event.target.value });
    const foundFetchco = fetchco.address.find(item => item._id === event.target.value );
    console.log(foundFetchco)
    setSelectDefault( event.target.value)
    if( foundFetchco===undefined){
      setFormData({ ...formData, address:addressDefault });
    }
    else
    setFormData({ ...formData, address:foundFetchco });
  };

  const handleEditorChange = (html,index) => {
    setFormData({ ...formData, [index]: html });
  };

  const handleChangeSkill = (event, newValue) => {
    setFormData({ ...formData, skill: newValue });
  };

  const handleChangeLevel = (event, newValue) => {
    setFormData({ ...formData, exp: newValue });
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, duration: newDate.$d });
    console.log(newDate)
    console.log(newDate.$d)
  };

  const submitForm = async (e) => {
    e.preventDefault();
    formData.skillformat = await formData.skill.map((skill) => skill.title);
    formData.expformat = await formData.exp.map((exp) => exp.title);
    console.log(formData);
    let allFieldsChanged = true; // Biến cờ để kiểm tra
    const checksalaryto= parseFloat(formData.salaryto);
    const checksalaryfrom= parseFloat(formData.salaryfrom);
    if (!isNaN(checksalaryto) && !isNaN(checksalaryfrom)) {
      if(checksalaryfrom>=checksalaryto){
        allFieldsChanged = false;
      }
    }else{
      allFieldsChanged = false;
    }
    for (let key in formData) {
      if (key === 'CO' || key === 'salaryto'|| key === 'salaryfrom') continue;
      if (JSON.stringify(formData[key]) === JSON.stringify(defaultFormData[key])) {
        console.log(`Field ${key} has not been changed.`);
        allFieldsChanged = false;  // Đặt biến cờ thành false nếu có trường chưa thay đổi
      }
    }
    if(allFieldsChanged) {
      if(idjob){
        try {
          await postService.update(formData,accessToken,idjob)
        } catch (error) {
          console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
        }

    }else{
      try {
        await postService.create(formData,accessToken)
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    }
    }
    else{
      console.log("loi~");
    }
  };



  const levelskill = [
   "Intern" ,
    "Fresher" ,
     "Juinor" 
  ];

  const skills = [
    "HTML",
    "CSS" ,
    "WORDPRESS" ,
     "C" ,
     "C++" ,
    "C#" ,
    ".NET", 
    "SQLserver"
  ];

  useEffect(() => {
    const getjob= async () => {
      try {
        if (idjob) {
          const res  = await postService.getJobbyID(idjob)
          setFormData({
            title:res.data.title,
            des:res.data.des,
            require:res.data.require,
            benefit:res.data.benefit,
            address:res.data.address,
            skill:res.data.tag.skill,
            exp:res.data.tag.exp,
            duration:res.data.duration,
            form:res.data.form,
            salaryfrom:res.data.salaryfrom,
            salaryto:res.data.salaryto,

          })

          setLoadjob(true)
          setAddressDefault(res.data.address)
          setSelectDefault(0)
          // setFetchco(response.data.data)
          // console.log(response.data.data)
          // setFormData({ 
          //   nameCO:response.data.data.name,
          //   desCO:response.data.data.des,
          //   scaleto:response.data.data.scaleto,
          //   scalefrom:response.data.data.scalefrom,
          //   taxcode:response.data.data.taxcode,
          //   iDusermanager:response.data.data.idaccount_manager,
          //   linkCO:response.data.data.link,
          // })
          // let addressData  = response.data.data.address.map((address) => ({
          //   city: { label: address.city, code:address.city_code},
          //   district: { label: address.district, code:address.district_code},
          //   ward: { label: address.ward, code: address.ward_code},
          //   streetnumber: address.streetnumber
          // }));
          // setListaddress(addressData)
          // // image: null,
          // nameCO: "",
          // desCO: "",
          // linkCO: "",
          // scaleto: "",
          // scalefrom: "",
          // taxcode: "",
          // iDusermanager: "",
          // listaddress: [],
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getjob();
  }, [idjob]);

  useEffect(() => {
    const getCO = async () => {
      try {
        const res = await COService.getByID(idCO)
        setFetchco(res.data);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getCO();
  }, []);

  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <CO data={fetchco}></CO>
          <Box>
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
                    {idjob ? "Sửa bài đăng" : "tạo bài đăng"}
                </Typography>

                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Tiêu đề:
                  </Typography>
                  <TextField
                    sx={{ width: "700px" }}
                    id="outlined-basic"
                    label="Nhập tiêu đề"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Lương:
                  </Typography>
                  <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Từ
                    </InputLabel>
                    <FilledInput
                      type="number"
                      name="salaryfrom"
                      value={formData.salaryfrom}
                      onChange={handleNumberChange}
                      id="filled-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>
                  {" --- "}
                  <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Đến
                    </InputLabel>
                    <FilledInput
                      type="number"
                      name="salaryto"
                      value={formData.salaryto}
                      onChange={handleNumberChange}
                      id="filled-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Hình thức:
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="form"
                      value={formData.form}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="home"
                        control={<Radio />}
                        label="Tại nhà"
                      />
                      <FormControlLabel
                        value="office"
                        control={<Radio />}
                        label="Văn phòng"
                      />
                      <FormControlLabel
                        value="flex"
                        control={<Radio />}
                        label="Linh hoạt"
                      />
                    </RadioGroup>
                  </FormControl>
                </Typography>
                <Typography  className="form-item">
                <Typography className="label-form" component="div">
                    Địa chỉ:
                  </Typography>
                  <FormControl sx={{ minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Địa chỉ
                    </InputLabel>
                    <Select
                      sx={{width:"500px"}}
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={selectDefault}
                      label="Địa chỉ"
                      onChange={handleAddressChange}
                    >
                      {(loadjob ) && (
                        <MenuItem  value={0}>{"Hiện tại: "+addressDefault.streetnumber+", "+addressDefault.ward+", "+addressDefault.district+", "+addressDefault.city}</MenuItem>
                       )
                      } 
                        
                      {fetchco && fetchco.address.map((item,index)=>(
                        <MenuItem key={index} value={item._id}>{item.streetnumber+", "+item.ward+", "+item.district+", "+item.city}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Kỹ năng:
                  </Typography>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    name="aaa"
                    options={skills}
                    disableCloseOnSelect
                    value={formData.skill}
                    onChange={handleChangeSkill}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Kĩ năng"
                        placeholder="Chọn thêm"
                      />
                    )}
                  />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Trình độ:
                  </Typography>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={levelskill}
                    disableCloseOnSelect
                    value={formData.exp}
                    getOptionLabel={(option) => option}
                    onChange={handleChangeLevel}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Trình độ"
                        placeholder="Chọn thêm"
                      />
                    )}
                  />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Mô tả:
                  </Typography>
                  <EditorField onContentChange={handleEditorChange} index="des"  defaultValue={formData.des || ''} />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Yêu cầu:
                  </Typography>
                  <EditorField onContentChange={handleEditorChange} index="require"  defaultValue={formData.require || ''} />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Quyền lợi:
                  </Typography>
                  <EditorField onContentChange={handleEditorChange} index="benefit"  defaultValue={formData.benefit || ''} />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Thời hạn:
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ padding: 0 }}
                      components={["DateTimePicker"]}
                    >
                      <DemoItem>
                        <DateTimePicker
                          name="duration"
                          onChange={handleDateChange}
                          value={dayjs(formData.duration)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </Typography>
              </CardContent>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mb: 3, mr: 3, float: "right" }}
              >
                <Button variant="outlined" color="error">
                  Xóa bài
                </Button>
                <Button onClick={submitForm} variant="contained" color="success">
                  Lưu
                </Button>
              </Stack>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurdPost;
