import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoImg from "../logo.png";
import { Box } from "@mui/material";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
