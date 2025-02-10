import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminUpdateCODialog({open,setOpen,onSubmit } ) {

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
            const idacc = formJson.idacc;
            onSubmit(idacc)
            handleClose();
          },
        }}
      >
        <DialogTitle>Cập nhật tài khoản sở hữu công ty</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ID Account:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="idacc"
            name="idacc"
            label="Nhập"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Xác nhận</Button>
        </DialogActions>
      </Dialog>
  );
}
