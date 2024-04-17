import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CV from "../../components/CV/CV";

export default function DialogApplyCV({setOpen,open}) {
  
    const [CVs, setCVs]= React.useState([])

    const handleClose = () => {
        setOpen(false);
    };

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const id="660cfd11a53d71f4940dcc55"
        const temp = [];
        const res = await axios.get(`http://localhost:4000/api/user/${id}`);
        res.data.data.CV.map((item)=>(
          temp.push({filetitle:item.filetitle,linkfile:item.linkfile,_id:item._id})
        ));
        console.log(temp)
        setCVs(temp)
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };
    getUserData();
    // getUserData();
  }, []);


  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Chọn CV để ứng tuyển"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Danh sách</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {CVs.map((item)=>(
                    <FormControlLabel value={item._id} control={<Radio />} label={<CV title={item.filetitle} link={item.link} id={item._id}></CV>} />
                    
                ))}

            </RadioGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose} autoFocus>
            Ứng tuyển
          </Button>
        </DialogActions>
      </Dialog>
  );
}