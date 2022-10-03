import { Box, Card, CardHeader, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
function ProfileSocialInfo({ profile }) {
  const { linkedinLink, facebookLink, twitterLink, instagramLink } = profile;
  const SOCIALS = [
    {
      name: "LinkedIn",
      icon: (
        <IconStyle color="#006097">
          <LinkedInIcon />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Facebook",
      icon: (
        <IconStyle color="#1C9CEA">
          <FacebookIcon />
        </IconStyle>
      ),
      href: facebookLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#1877F2">
          <TwitterIcon />
        </IconStyle>
      ),
      href: twitterLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#D7336D">
          <InstagramIcon />
        </IconStyle>
      ),
      href: instagramLink,
    },
  ];

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
