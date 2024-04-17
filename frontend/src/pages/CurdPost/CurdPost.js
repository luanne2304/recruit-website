import React, { useState, useRef, useEffect } from "react";
import axios from "axios"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import CO from "../../components/CO/CO";
import "./CurdPost.css";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CurdPost = () => {

  const isOptionEqualToValue = (option, value) => {
    if (!value) {
      return false;
    }
    return option.title === value.title;
  };


  
  const handleDesChange = (html) => {
    setFormData({ ...formData, des:html });
  };

  const handleRequireChange = (html) => {
    setFormData({ ...formData, require:html });
  };

  const handleBenefitChange = (html) => {
    setFormData({ ...formData, benefit:html });
  };

  const handleChangeSkill = (event, newValue) => {
    setFormData({ ...formData, skill: newValue});
  };

  const handleChangeLevel = (event, newValue) => {
    setFormData({ ...formData, exp: newValue});
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, duration: newDate.$d})
  };

  const check =async () => {
     formData.skill=await formData.skill.map(skill => skill.title)
     formData.exp=await formData.exp.map(exp => exp.title)
    console.log(formData)
    try{
      await axios.post(`http://localhost:4000/api/post/create`,formData)
      } catch(error){
        console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
  };

  const [fetchTP, setFetchTP]=useState([])
  const [fetchQH, setFetchQH]=useState([])
  const [fetchPX, setFetchPX]=useState([])
  const [tree,setTree]=useState()

  const [formData, setFormData] = useState({
    city:null,
    district:null,
    ward:null,
    title: "",
    des: "",
    require: "",
    benefit: "",
    address: "Q6",
    form: "",
    salaryto: "",
    salaryfrom: "",
    duration: null,
    skill: [],
    exp: [],
    CO: "Tập đoàn Hoa sen",
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
      setFormData({...formData,district:null,ward:null,city:value})
      setFetchQH(tempQH)
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
      setFormData({...formData,ward:null,district: value})
      setFetchPX(tempPX)
    }
  };


  useEffect(()=>{
    const calltp =async ()=>{
      try{
        let tempCity=[]
        const res= await axios.get(`http://localhost:4000/api/getTree`)
        setTree(res.data);
        for (const key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            const code = res.data[key].code;
            const label = res.data[key].name;
            tempCity.push({ label, code });
          }
        }
        setFetchTP(tempCity)
        } catch(error){
          console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      }
    }
    calltp()
  },[])
  
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
                    TP
                  </Typography>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={formData.city}
                  options={fetchTP}
                  onChange={handleChangeTP}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Tỉnh / TP" 
                  />}
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
                  value={formData.district}
                  onChange={handleChangeQH}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Quận / Huyện" 
                  />}
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
                  value={formData.ward}
                  onChange={(event, value) => {setFormData({...formData,ward:value})}}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Phường / Xã" 
                  />}
                />
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
