import * as React from "react";
import Hamburger from "./Hamburger";
import { LocalStorageRemove } from "./Functions/LocalStorage";

import { SearchWindow } from "./SearchWindow";

// import styles from "../styles/main.module.scss";

import { NavLink, Navigate, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";

import { LoginIcon } from "./LoginIcon";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const { setUserInfo, userInfo } = useContext(UserContext);
  const [userInfoString, setUserInfoString] = useState(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);

  // if (userInfoString) {
  //   console.log(
  //     "userInfoStringのオブジェクト要素数:",
  //     Object.keys(userInfoString).length
  //   );
  // }
  // console.log("userName", userName);
  // console.log(userInfoString);
  // console.log("firstName:", userInfoString?.firstName, firstName);
  // console.log("lastName:", userInfoString?.lastName, lastName);
  // console.log("userName email:", userInfoString?.email, userName);

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfoObj = JSON.parse(userInfoString);
      // setUserInfo(userInfoObj);
      setFirstName(userInfoObj.firstName);
      setLastName(userInfoObj.lastName);
      setUserName(userInfoObj.email);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userName) {
      // ログイン処理が完了している場合にユーザー情報を取得
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            setUserInfo(userInfo);
          });
        }
      });
    }
  }, [userName]);

  async function logout() {
    const response = await fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });

    if (response.ok) {
      setFirstName(null);
      setLastName(null);
      setUserName(null);
      LocalStorageRemove();

      navigate("/temp");
      setTimeout(() => navigate("/"), 0);
      toast.success("You are logged out!");
      console.log("Remove userInfoString:", userInfoString);
    } else {
      toast.error("Logout failed!");
    }
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{ marginTop: "30px" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!userName && (
        <>
          <MenuItem
            style={{
              width: "90px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleMenuClose}
          >
            <NavLink to="/login">Login</NavLink>
          </MenuItem>
          <MenuItem
            style={{
              width: "90px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleMenuClose}
          >
            <NavLink to="/register">Resister</NavLink>
          </MenuItem>
        </>
      )}
      {userName && (
        <>
          <MenuItem
            style={{
              width: "90px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleMenuClose}
          >
            <a onClick={logout}>Logout</a>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ bgcolor: "#f5f5f5" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#4e575f",
                display: { sm: "block" },
              }}
            >
              <NavLink to="/">MERN-Blog</NavLink>
            </Typography>

            <Box
              sx={{
                width: "50px",
                display: { xs: "flex", sm: "flex", md: "none" },
              }}
            >
              <IconButton
                size="small"
                edge="end"
                sx={{
                  width: "50px",
                  display: { xs: "flex", md: "none", lg: "none" },
                }}
              >
                <Hamburger userName={userName} />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <SearchWindow />
            </Box>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  md: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {userName && (
                <>
                  <NavLink to={"/create"}>
                    <IconButton
                      size="large"
                      color="4e575f"
                      sx={{ borderRadius: 1 }}
                    >
                      <BorderColorIcon size="large" color="4e575f" />
                      <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{ fontSize: "17px" }}
                        sx={{
                          color: "#4e575f",
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        Create Post
                      </Typography>
                    </IconButton>
                  </NavLink>
                </>
              )}
              {!userName && (
                <>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="4e575f"
                    sx={{ borderRadius: 1 }}
                  >
                    <BorderColorIcon size="large" color="4e575f" />
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      style={{ fontSize: "17px" }}
                      sx={{
                        color: "#4e575f",
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      Create Post
                    </Typography>
                  </IconButton>
                </>
              )}
            </Box>
            {userName && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="4e575f"
              >
                <LoginIcon
                  firstLetter={firstName.charAt(0)}
                  lastLetter={lastName.charAt(0)}
                />
              </IconButton>
            )}
            {/* <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                sx={{
                  height: "50px",
                  width: "50px",
                }}
                size="small"
                edge="end"
              >
                <Hamburger userName={userName} />
              </IconButton>
            </Box> */}
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
        {renderMenu}
      </Box>
    </>
  );
}
