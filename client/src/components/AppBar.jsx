import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { logout } from "./Functions/Logout";
import { LocalStorageRemove } from "./Functions/LocalStorage";
import { useNavigate, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { LoginIcon } from "./LoginIcon";
// import Logo from "../assets/Logo-icon.PNG";
import Logo from "../assets/logo-3.png";
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

  const navigate = useNavigate();

  function isEmpty(obj) {
    if (obj !== undefined && obj !== null) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    return true;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
    await logout(LocalStorageRemove, setUserInfo, navigate, toast);
  };

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
              style={{
                height: "60px",
                width: "120px",
                verticalAlign: "middle",
              }}
            />
          </Link>
        </Typography>

        {!isEmpty(userInfo) && (
          <>
            <Link to={"/create"}>
              <IconButton
                sx={{
                  borderRadius: "5px",
                  border: "solid 2px #E28089",
                  size: "small",
                  p: "3px",
                  pr: "8px",
                  mr: 2,
                  color: "#E28089",
                  backgroundColor: "#ffeff1",
                }}
              >
                <BorderColorIcon
                  sx={{ color: "#E28089", pl: 1, fontSize: "31px" }}
                />
                <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                  Create Post
                </Typography>
              </IconButton>
            </Link>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {/* <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="4e575f"
              > */}
              {/* <Link to={`/post/account/${userId}`}> */}
              <LoginIcon
                firstLetter={firstName?.charAt(0)}
                lastLetter={lastName?.charAt(0)}
                userIcon={userIcon}
              />
              {/* </Link> */}
              {/* </IconButton> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Sign Out</MenuItem>
              {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            </Menu>
          </>
        )}
      </Toolbar>
    </MyAppBar>
  );
};
