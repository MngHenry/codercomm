import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import React from "react";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import AlertDialog from "../../components/DeletePopper";

function CommentCard({ comment, author }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleActionsOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    handleMenuClose();
    dispatch(deleteComment({ commentId: comment._id }));
  };
  const handleEditComment = () => {
    console.log("author", author);
    console.log("comment author", comment.author._id);
  };
  const renderMenu = (
    <Menu
      id="actions-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleEditComment} sx={{ mx: 0.5 }}>
        edit
      </MenuItem>
      <MenuItem>
        <AlertDialog
          handleDelete={handleDeleteComment}
          handleWindowClose={handleMenuClose}
          sx={{ mx: 0.5 }}
        />
      </MenuItem>
    </Menu>
  );
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text,disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
          <IconButton onClick={handleActionsOpen}>
            <MoreVertIcon sx={{ fontSize: 30 }} />
            {author === comment.author._id ? renderMenu : <></>}
          </IconButton>
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
