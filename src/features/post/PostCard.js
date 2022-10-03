import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleActionsOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const handleDeletePost = () => {
    console.log("postId", post._id);
    dispatch(deletePost({ postId: post._id }));
  };

  const handleEditPost = () => {};

  const renderActionsMenu = (
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
      <MenuItem onClick={handleEditPost} sx={{ mx: 0.5 }}>
        edit
      </MenuItem>
      <MenuItem onClick={handleDeletePost} sx={{ mx: 0.5 }}>
        delete
      </MenuItem>
    </Menu>
  );
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <MoreVertIcon sx={{ fontSize: 30 }} onClick={handleActionsOpen} />
            {renderActionsMenu}
          </IconButton>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              heigh: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
