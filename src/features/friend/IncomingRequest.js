import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Card,
  Box,
  Pagination,
  Grid,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsRequest } from "./friendSlice";
import UserCard from "./UserCard";
function IncomingRequest({ filterName }) {
  const [page, setPage] = useState(1);

  const { currentPageUsers, usersById, totalPages } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsRequest({ filterName, page }));
  }, [filterName, page, dispatch]);
  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Waiting for response list
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <Box sx={{ flexGrow: 1 }} />

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>
        {users.length === 0 ? (
          <Typography variant="h6" sx={{ mb: 3 }}>
            No request found
          </Typography>
        ) : (
          <Grid container spacing={3} my={1}>
            {users.map((user) => (
              <Grid key={user._id} item xs={12} md={4}>
                <UserCard profile={user} />
              </Grid>
            ))}
          </Grid>
        )}
      </Card>
    </Container>
  );
}

export default IncomingRequest;
