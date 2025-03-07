import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import Box from "@mui/material/Box";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CV from "../../components/CV/CV";
import CVService from '../../services/CVService';
import { useAuth } from "../../utils/authUtils";
import ApplicationsService from '../../services/ApplicationsService';
export default function DialogApplyCV({setOpen,open,idpost}) {
    const { accessToken } = useAuth();
    const [CVs, setCVs]= React.useState([])
    const [radioCV,setRadioCV]= React.useState("")  
    const [error,setError]= React.useState(false)  
    const [helperText, setHelperText] = React.useState('');

    const handleClose = () => {
        setRadioCV("")
        setOpen(false);
        setError(false);
        setHelperText("")
    };

    const handleSubmit =async () => {
      if(radioCV==""){
        setError(true)
        setHelperText('Vui lòng chọn CV để ứng tuyển !!!');
      }
      else{
        setOpen(false);
        setRadioCV("")
        try {
          const res = await ApplicationsService.apply(radioCV,idpost)
          console.log(res)
        } catch (error) {
          console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
        }
      }
    };

    const handleRadioChange = (event) => {
      setRadioCV(event.target.value);
      setError(false);
      setHelperText("")
    };


  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const temp = [];
        const res = await CVService.getByUser(accessToken);
        res.data.map((item)=>(
          temp.push({filetitle:item.filetitle,linkfile:item.linkfile,_id:item._id})
        ));
        setCVs(temp)
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getUserData();
  }, []);


  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { minWidth: "500px", maxWidth: "90vw" } // Giới hạn kích thước chính xác
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{fontSize: "1.27rem", fontWeight: "bold"}}>
          {"Chọn CV để ứng tuyển"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <FormControl  sx={{width:"100%"}} error={error} >
            <FormLabel id="demo-radio-buttons-group-label">Danh sách</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleRadioChange}
                sx={{width:"100%"}}
            >
                {CVs.map((item,i)=>(
                  <Box key={i}  sx={{width:"100%"}}>
                    <FormControlLabel  sx={{width:"100%"}}  value={item._id} control={<Radio />} label={<CV title={item.filetitle} link={item.linkfile} id={item._id}></CV>} />
                  </Box>
                ))}

            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} autoFocus>
            Ứng tuyển
          </Button>
        </DialogActions>
      </Dialog>
  );
}