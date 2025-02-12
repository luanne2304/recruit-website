import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { workingform, levelskill, skills } from "../../utils/constants";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const minDistance = 500;

export default function ButtonDialogFilter({setFilter,handleFilter}) {

  const [open, setOpen] = React.useState(false);

  const [expObj, setExpObj]=React.useState([])
  const [skillObj, setSkillObj]=React.useState([])
  const [formObj, setFormObj]=React.useState([])

  const [formData, setFormData] = React.useState({
    city: "Tất cả mọi nơi",
    salary:[0, 10000],
    skill: [],
    exp: [],
    form: [],
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleresetFilter=()=>{
    setFormData({
      city: "All",
      salary:[0, 10000],
      skill: [],
      exp: [],
      form: [],
    })
    setFormObj([])
    setSkillObj([])
    setExpObj([])
  }

  const isOptionEqualToValue = (option, value) => {
    if (!value) {
      return false;
    }
    return option.title === value.title;
  };

  const handleChangeFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChangeExp = (event, newValue) => {
    setExpObj(newValue);
  };

  const handleChangeSkill = (event, newValue) => {
    setSkillObj(newValue );
  };

  const handleChangeForm = (event, newValue) => {
    setFormObj(newValue );
  };

  const handleChangewage = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setFormData({...formData,salary: [
        Math.min(newValue[0], formData.salary[1] - minDistance),
        formData.salary[1],
      ]});
    } else {
      setFormData({...formData,salary:[
        formData.salary[0],
        Math.max(newValue[1], formData.salary[0] + minDistance),
      ]});
    }
  };

  const currencies = [
    {
      value: "All",
      label: "Tất cả mọi nơi",
    },
    {
      value: "HCM",
      label: "Hồ Chí Minh",
    },
    {
      value: "HN",
      label: "Hà Nội",
    },
    {
      value: "DN",
      label: "Đà Nẵng",
    },
    {
      value: "Others",
      label: "Khác",
    },
  ];


  const test =async()=>{
    if(skillObj.length>0){
      formData.skill=await skillObj.map(skill => skill.title)
    }
    else{formData.skill=[] }
    if(expObj.length>0){
      formData.exp=await expObj.map(exp => exp.title)
    }
    else{formData.exp=[] }
    if(formObj.length>0){
      formData.form=await formObj.map(form => form.title)
    }
    else{formData.form=[] }
    setFilter(formData)
    handleFilter(formData)
  }

  return (
    <React.Fragment>
      <Button
        sx={{ fontSize: "15", padding: "10px 30px" }}
        variant="outlined"
        color="error"
        onClick={handleClickOpen}
      >
        <FilterAltIcon></FilterAltIcon>Bộ lọc
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Bộ lọc"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              sx={{ mt: "20px" }}
              id="outlined-select-currency-native"
              select
              label="Native select"
              name="city"
              value={formData.city}
              onChange={handleChangeFormData}
              SelectProps={{
                native: true,
              }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Autocomplete
              sx={{ mt: "20px" }}
              multiple
              id="checkboxes-tags-demo"
              options={levelskill}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              value={expObj}
              onChange={handleChangeExp}
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
                  label="Cấp bậc"
                  placeholder="Chọn thêm"
                />
              )}
            />
            <Autocomplete
              sx={{ mt: "20px" }}
              multiple
              id="checkboxes-tags-demo"
              options={skills}
              disableCloseOnSelect
              value={skillObj}
              getOptionLabel={(option) => option.title}
              onChange={handleChangeSkill}
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
            <Box>Mức lương</Box>
            <Box>
              {formData.salary[0]}$ - {formData.salary[1]}$
            </Box>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={formData.salary}
              onChange={handleChangewage}
              min={0}
              max={10000}
              step={500}
              disableSwap
            />
            <Autocomplete
              sx={{ mt: "20px" }}
              multiple
              id="checkboxes-tags-demo"
              options={workingform}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              value={formObj}
              onChange={handleChangeForm}
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
                  label="Hình thức làm việc"
                  placeholder="Chọn thêm"
                />
              )}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleresetFilter} autoFocus>
            Xóa bộ lọc
          </Button>
          <Button onClick={test} autoFocus>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
