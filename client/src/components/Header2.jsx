import * as React from "react";
import Hamburger from "./Hamburger";
import { LocalStorage, LocalStorageRemove } from "./Functions/LocalStorage";

import { SearchWindow } from "./SearchWindow";

// import styles from "../styles/main.module.scss";

import { NavLink, Navigate, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { LoginIcon } from "./LoginIcon";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import MoreIcon from "@mui/icons-material/MoreVert";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [userInfoString, setUserInfoString] = useState([]);
  // const [firstName, setFirstName] = useState(userInfoString?.firstName);
  // const [lastName, setLastName] = useState(userInfoString?.lastName);
  // const [userName, setUserName] = useState(userInfoString?.email);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { setUserInfo, userInfo } = useContext(UserContext);

  // if (userInfoString) {
  //   console.log(
  //     "userInfoStringのオブジェクト要素数:",
  //     Object.keys(userInfoString).length
  //   );
  // }
  // console.log(userInfoString);
  // console.log("firstName:", userInfoString?.firstName, firstName);
  // console.log("lastName:", userInfoString?.lastName, lastName);
  // console.log("userName email:", userInfoString?.email, userName);

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
    // LocalStorageからuserInfoを取得し、setStateで値を更新する
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfoString(storedUserInfo);
    setFirstName(storedUserInfo?.firstName);
    setLastName(storedUserInfo?.lastName);
    setUserName(storedUserInfo?.email);

    if (userName) {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      }).then((response) => {
        response.json().then((userInfo) => {
          LocalStorage({ userInfo: userInfo });
          // setUserInfo(userInfo);
          // localStorage.setItem("userInfo", userInfo);
        });
      });
    }
  }, []);

  async function logout() {
    const response = await fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });

    if (response.ok) {
      setUserInfoString([]);
      setFirstName(null);
      setLastName(null);
      setUserName(null);
      LocalStorageRemove();
      navigate("/");
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
              height: "30px",
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
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     style={{
  //       marginTop: "30px",
  //       width: "300px",
  //       // height: "100px",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //     sx={{
  //       color: "#4e575f",
  //       display: { xs: "none", sm: "block" },
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       {userName && (
  //         <>
  //           {/* //////////////////////////////////////////////// */}
  //           <MenuItem>
  //             <NavLink to={"/create"}>
  //               <IconButton size="large" color="4e575f">
  //                 <BorderColorIcon size="large" color="4e575f" />
  //                 <Typography
  //                   variant="h6"
  //                   noWrap
  //                   component="div"
  //                   style={{
  //                     fontSize: "17px",
  //                     width: "90px",
  //                     height: "30px",
  //                     display: "flex",
  //                     justifyContent: "center",
  //                     alignItems: "center",
  //                   }}
  //                   sx={{
  //                     color: "#4e575f",
  //                     display: { xs: "none", sm: "block" },
  //                   }}
  //                 >
  //                   Create Post
  //                 </Typography>
  //               </IconButton>
  //             </NavLink>
  //           </MenuItem>
  //         </>
  //       )}
  //       {!userName && (
  //         <>
  //           <IconButton
  //             size="large"
  //             edge="end"
  //             aria-label="account of current user"
  //             aria-controls={menuId}
  //             aria-haspopup="true"
  //             onClick={handleProfileMenuOpen}
  //             color="4e575f"
  //           >
  //             <BorderColorIcon size="large" color="4e575f" />
  //             <Typography
  //               variant="h6"
  //               noWrap
  //               component="div"
  //               style={{ fontSize: "17px" }}
  //               sx={{
  //                 color: "#4e575f",
  //                 display: { xs: "none", sm: "block" },
  //               }}
  //             >
  //               Create Post
  //             </Typography>
  //           </IconButton>
  //         </>
  //       )}
  //     </MenuItem>
  //   </Menu>
  // );

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
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <SearchWindow />
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            {userName && (
              <IconButton
                // size="large"
                // edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="4e575f"
                // sx={{
                //   marginRight: "10px",
                // }}
              >
                <LoginIcon
                  firstLetter={firstName.charAt(0)}
                  lastLetter={lastName.charAt(0)}
                />
              </IconButton>
            )}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="4e575f"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
              {/* <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="4e575f"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

              {userName && (
                <>
                  <NavLink to={"/create"}>
                    <IconButton size="large" color="4e575f">
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

              <IconButton size="small" edge="end">
                <Hamburger userName={userName} />
              </IconButton>
            </Box>
            <Box
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
            </Box>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
        {renderMenu}
      </Box>
    </>
  );
}
