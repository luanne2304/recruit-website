import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import EditorField from "../../components/EditorField/EditorField";
import CO from "../../components/CO/CO";
import "./CurdPost.css";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CurdPost = () => {

  let des
  let require
  let benefit
  let skill= []
  let level=[]
  
  const handleDesChange = (html) => {
    des=html
  };

  const handleRequireChange = (html) => {
    require=html
  };

  const handleBenefitChange = (html) => {
    benefit=html
  };



  const check = () => {
    formData.skill=skill
    formData.exp=level
    formData.des=des
    formData.require=require
    formData.benefit=benefit
    console.log(formData)
  };

  const [formData, setFormData] = useState({
    title: "",
    des: "",
    require: "",
    benefit: "",
    address: "",
    form: "",
    salaryto: "",
    salaryfrom: "",
    duration: null,
    skill: [],
    exp: [],
    CO: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const levelskill = [
    { title: "Intern" },
    { title: "Fresher" },
    { title: "Juinor" },
    { title: "Senior" },
    { title: "Manager" },
  ];

  const skills = [
    { title: "HTML"  },
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


  
  return (
    <Box>
      <Box className="main">
        <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
          <CO></CO>
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
                    Lương
                  </Typography>
                  <FormControl>
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
                  </FormControl>
                  <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Từ
                    </InputLabel>
                    <FilledInput
                      name="salaryto"
                      value={formData.salaryto}
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
                      name="salaryfrom"
                      value={formData.salaryfrom}
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
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Kỹ năng:
                  </Typography>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={skills}
                    disableCloseOnSelect
                    onChange={(event, value) => skill= value}
                    getOptionLabel={(option) => option.title}
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
                    onChange={(event, value) => level= value}
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
                  <EditorField onContentChange={handleDesChange} />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Yêu cầu:
                  </Typography>
                  <EditorField onContentChange={handleRequireChange} />
                </Typography>
                <Typography className="form-item">
                  <Typography className="label-form" component="div">
                    Quyền lợi:         
                  </Typography>
                  <EditorField onContentChange={handleBenefitChange}/>
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
                        // value={formData.duration}
                        // onChange={(event, value) => setFormData({...formData,duration:value})}
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
                <Button onClick={check} variant="contained" color="success">
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
