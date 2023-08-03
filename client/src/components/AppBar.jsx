import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { DRAWER_WIDTH } from "../constants";
import { LoginIcon } from "./LoginIcon";

import { Box } from "@mui/material";

const MyAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const AppBar = (props, { userData }) => {
  const title = "MERN-Blog";
  const open = props.open;
  const toggleDrawer = props.toggleDrawer;

  const firstName = props.userData?.firstName;
  const lastName = props.userData?.lastName;
  const userName = props.userData?.userName;

  return (
    <MyAppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          backgroundColor: "#353a40",
          // backgroundColor: "#295D72",
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        {userName && (
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="4e575f"
          >
            <LoginIcon
              firstLetter={firstName.charAt(0)}
              lastLetter={lastName.charAt(0)}
            />
          </IconButton>
        )}
      </Toolbar>
    </MyAppBar>
  );
};
