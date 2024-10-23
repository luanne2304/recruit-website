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
import CO from "../../components/CO/CO";
import "./CurdPost.css";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CurdPost = () => {
  const { idCO } = useParams();

  const [fetchco, setFetchco] = useState();

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
    return option.title === value.title;
  };

  const handleChange = (event) => {
    // setFormData({ ...formData, [fieldName]: event.target.value });
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAddressChange = (event) => {
    // setFormData({ ...formData, [fieldName]: event.target.value });
    const foundFetchco = fetchco.address.find(item => item._id === event.target.value );
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
    }
    for (let key in formData) {
      if (key === 'CO' || key === 'salaryto'|| key === 'salaryfrom') continue;
      if (JSON.stringify(formData[key]) === JSON.stringify(defaultFormData[key])) {
        console.log(`Field ${key} has not been changed.`);
        allFieldsChanged = false;  // Đặt biến cờ thành false nếu có trường chưa thay đổi
      }
    }
    if(allFieldsChanged) {
      console.log("hoan tat");
    }
    else{
      console.log("loi~");
    }
    // try {
    //   await axios.post(`http://localhost:4000/api/post/create`, formData);
    // } catch (error) {
    //   console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    // }
  };



  const levelskill = [
    { title: "Intern" },
    { title: "Fresher" },
    { title: "Juinor" },
    { title: "Senior" },
    { title: "Manager" },
  ];

  const skills = [
    { title: "HTML" },
    { title: "CSS" },
    { title: "WORDPRESS" },
    { title: "C" },
    { title: "C++" },
    { title: "C#" },
    { title: "Javasript" },
    { title: "PHP" },
    { title: "Java" },
    { title: "Python" },
    { title: "RUBY" },
    { title: "SQLserver" },
    { title: "MySQL" },
    { title: "ORACLE" },
    { title: "AWS" },
    { title: "DOCKER" },
    { title: "Angular" },
    { title: "VUE" },
    { title: "REACT" },
    { title: "NEXTJS" },
    { title: "SPRING" },
    { title: "NODEJS" },
    { title: "GOLANG" },
    { title: ".NET" },
    { title: "LAVAREL" },
    { title: "RAILS" },
    { title: "Fluter" },
    { title: "React Native" },
  ];



  useEffect(() => {
    const getCO = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/CO/getCObyID/${idCO}`
        );
        console.log(response.data.data)
        setFetchco(response.data.data);
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
                  Tạo bài đăng
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
                  {/* <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                    >
                      <FormControlLabel
                        value="Salary"
                        control={<Radio />}
                        label="Lương"
                      />
                      <FormControlLabel
                        value="Unknow"
                        control={<Radio />}
                        label="Thỏa thuận"
                      />
                    </RadioGroup>
                  </FormControl> */}
                  <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Từ
                    </InputLabel>
                    <FilledInput
                      type="number"
                      name="salaryfrom"
                      value={formData.salaryfrom}
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      defaultValue=""
                      label="Địa chỉ"
                      onChange={handleAddressChange}
                    >
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
                    onChange={handleChangeSkill}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
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
                    getOptionLabel={(option) => option.title}
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
                        {option.title}
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
                  <EditorField onContentChange={handleEditorChange} index="des" />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Yêu cầu:
                  </Typography>
                  <EditorField onContentChange={handleEditorChange} index="require"/>
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Quyền lợi:
                  </Typography>
                  <EditorField onContentChange={handleEditorChange} index="benefit"/>
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
