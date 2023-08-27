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
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { LoginIcon } from "./LoginIcon";
// import Logo from "../assets/Logo-icon.PNG";
import Logo from "../assets/Logo-2.png";
import { Box } from "@mui/material";

const DRAWER_WIDTH = 210;

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
  // const title = "MERN-Blog";
  const open = props.open;
  const toggleDrawer = props.toggleDrawer;
  const { setUserInfo, userInfo } = useContext(UserContext);

  // console.log("userData toggle:", props.userData);

  const firstName = props.userData?.firstName;
  const lastName = props.userData?.lastName;
  const userName = props.userData?.userName;
  const userIcon = props.userData?.userIcon;
  const userId = props.userData?.userId;

  function isEmpty(obj) {
    console.log(
      "isEnpty",
      Object.keys(obj).length === 0 && obj.constructor === Object
    );
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

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
              style={{ height: "50px", verticalAlign: "middle" }}
            />
          </Link>
        </Typography>

        {!isEmpty(userInfo) && (
          <>
            <Link to={"/create"}>
              <IconButton
                sx={{
                  borderRadius: "5px",
                  border: "solid 2px #2ba7bf",
                  size: "small",
                  p: "3px",
                  pr: "8px",
                  mr: 2,
                  color: "#2ba7bf",
                  backgroundColor: "#eef9fb",
                }}
              >
                <BorderColorIcon
                  sx={{ color: "#2ba7bf", pl: 1, fontSize: "31px" }}
                />
                <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                  Create Post
                </Typography>
              </IconButton>
            </Link>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="4e575f"
            >
              <Link to={`/post/account/${userId}`}>
                <LoginIcon
                  firstLetter={firstName?.charAt(0)}
                  lastLetter={lastName?.charAt(0)}
                  userIcon={userIcon}
                />
              </Link>
            </IconButton>
          </>
        )}
      </Toolbar>
    </MyAppBar>
  );
};
