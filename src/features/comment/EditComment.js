import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { editComment } from "./commentSlice";

export default function CommentEdit({ content, handleMenuClose, commentId }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [commentValue, setCommentValue] = React.useState(content);
  const handleClose = () => {
    handleMenuClose();
    setOpen(false);
  };
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    handleClose();
    event.preventDefault();
    dispatch(editComment({ commentValue, commentId }));
  };
  return (
    <div>
      <Typography variant="body2" onClick={handleClickOpen}>
        Edit
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" alignItems="center">
              <Avatar src={user.avatarUrl} alt={user.name} />
              <TextField
                fullWidth
                value={commentValue}
                size="small"
                placeholder="Write a comment..."
                onChange={(event) => setCommentValue(event.target.value)}
                sx={{
                  ml: 2,
                  mr: 1,
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: (theme) =>
                      `${theme.palette.grey[500_32]} !important`,
                  },
                }}
              />
              <IconButton type="submit">
                <SendIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
