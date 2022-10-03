import React, { useState } from "react";
import { Stack, Typography, Card, Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import SearchInput from "../../components/SearchInput";
import IncomingRequest from "./IncomingRequest";
import OutgoingRequest from "./OutgoingRequest";
function FriendRequests() {
  const [filterName, setFilterName] = useState("");

  const { totalUsers } = useSelector((state) => state.friend);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h4" sx={{ color: "text.secondary", ml: 1 }}>
              {totalUsers > 1
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : "No request found"}
            </Typography>
          </Stack>
        </Stack>
        <IncomingRequest filterName={filterName} />
        <Box sx={{ flexGrow: 1 }} />
        <OutgoingRequest filterName={filterName} />
      </Card>
    </Container>
  );
}

export default FriendRequests;
