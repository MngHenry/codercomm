import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function AlertDialog({ handleDelete, handleMenuClose }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleMenuClose();
  };

  return (
    <div>
      <Typography variant="body2" onClick={handleClickOpen}>
        Delete
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            "this post will be permanent removed after your confirmation. do you want to delete it?"
          }
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>not now</Button>
          <Button onClick={handleDelete} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
