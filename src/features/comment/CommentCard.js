import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import React from "react";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import AlertDialog from "../../components/DeletePopper";
import CommentEdit from "./EditComment";

function CommentCard({ comment, author }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleActionsOpen = (e) => {
    author === comment.author._id
      ? setAnchorEl(e.currentTarget)
      : setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    handleMenuClose();
    dispatch(deleteComment({ commentId: comment._id }));
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
      <MenuItem sx={{ mx: 0.5 }} variant="subtitle2">
        <CommentEdit
          content={comment.content}
          handleMenuClose={handleMenuClose}
          commentId={comment._id}
        />
      </MenuItem>
      <MenuItem>
        <AlertDialog
          handleDelete={handleDeleteComment}
          handleMenuClose={handleMenuClose}
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
          <Box>
            <MoreVertIcon sx={{ fontSize: 30 }} onClick={handleActionsOpen} />
            {renderMenu}
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
