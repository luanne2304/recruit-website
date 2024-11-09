import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ReportformDialog({open,setOpen,idpost} ) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
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
        <DialogTitle>Báo cáo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Mô tả chi tiết về báo cáo của bạn cho bài viết này
            - Tất cả các báo cáo của bạn sẽ được chúng tôi kiểm duyệt kĩ càng 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="report"
            name="email"
            label="Mô tả"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Báo cáo</Button>
        </DialogActions>
      </Dialog>
  );
}
