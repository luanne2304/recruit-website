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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const minDistance = 500;

export default function ButtonDialogFilter() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [valuewage, setvaluewage] = React.useState([0, 10000]);

  const handleChangewage = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setvaluewage([
        Math.min(newValue[0], valuewage[1] - minDistance),
        valuewage[1],
      ]);
    } else {
      setvaluewage([
        valuewage[0],
        Math.max(newValue[1], valuewage[0] + minDistance),
      ]);
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

  const workingform = [
    { title: "Tại văn phòng" },
    { title: "Làm từ xa" },
    { title: "Linh hoạt" },
  ];
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
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
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
            <Box>Mức lương</Box>
            <Box>
              {valuewage[0]}$ - {valuewage[1]}$
            </Box>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={valuewage}
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
          <Button onClick={handleClose} autoFocus>
            Áp dụng
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
