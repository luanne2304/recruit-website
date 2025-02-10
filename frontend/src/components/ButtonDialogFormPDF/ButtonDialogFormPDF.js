import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useAuth }  from '../../utils/authUtils';
import CVService from "../../services/CVService";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

export default function ButtonDialogFormPDF() {
  const { accessToken } = useAuth()
    const [open, setOpen] = React.useState(false);
    const [filepdf,setFilepdf]= React.useState(null);
    const [filetitle,setFiletitle]= React.useState(null);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const addNewCV = (e) => {
    // open file selector select only pdf file
    if(e.target.files.length === 0) return;

    if(e.target.files[0].type !== "application/pdf") {
      alert("Vui lòng chọn file pdf");
      return;
    }
    setFilepdf(e.target.files[0])
  }

  const test= async()=>{
    const formData = new FormData();
    formData.append('pdf', filepdf);
    formData.append('filetitle', filetitle);
    try{
    await CVService.upload(formData,accessToken)
    setOpen(false)
    } catch(error){
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
    } 

  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm CV
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Thêm CV vào hồ sơ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhằm mục đích lưu trữ dành cho người dùng để dễ quản lý CV khi mình và cả khi nộp hồ sơ
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="filetitle"
            label="Nhập tiêu đề file"
            fullWidth
            variant="standard"
            onChange={(e)=> setFiletitle(e.target.value)}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput  type="file" accept=".pdf" onChange={addNewCV} />
          </Button>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">Hủy</Button>
          <Button onClick={test}  variant="contained"  color="success">Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
