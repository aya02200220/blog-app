import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { DRAWER_WIDTH } from "../constants";
import { LoginIcon } from "./LoginIcon";
import Logo from "../assets/Logo1.PNG";

import { Box } from "@mui/material";

const MyAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // boxShadow: "none",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  // borderBottom: "solid 1px #333",
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
  const userIcon = props.userData?.userIcon;

  return (
    <MyAppBar position="absolute" open={open}>
      <ToastContainer />
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          // backgroundColor: "#353a40",
          backgroundColor: "#fff",
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
              color: "#717070",
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
          // sx={{ flexGrow: 1, color: "#717070" }}
          sx={{ flexGrow: 1, color: "#333" }}
        >
          <Link to={`/`}>
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "40px", verticalAlign: "middle" }}
            />
            {/* {title} */}
          </Link>
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
              userIcon={userIcon}
            />
          </IconButton>
        )}
      </Toolbar>
    </MyAppBar>
  );
};
