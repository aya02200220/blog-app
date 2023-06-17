import * as React from "react";
import Hamburger from "./Hamburger";

import styles from "../styles/main.module.scss";

import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { setUserInfo, userInfo } = useContext(UserContext);
  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;
  const userName = userInfo?.email;

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
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    toast.success("You are logged out!");
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
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      style={{
        marginTop: "30px",
        width: "300px",
        // height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      sx={{
        color: "#4e575f",
        display: { xs: "none", sm: "block" },
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        {userName && (
          <>
            {/* //////////////////////////////////////////////// */}
            <MenuItem>
              <NavLink to={"/create"}>
                <IconButton size="large" color="4e575f">
                  <BorderColorIcon size="large" color="4e575f" />
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    style={{
                      fontSize: "17px",
                      width: "90px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    sx={{
                      color: "#4e575f",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Create Post
                  </Typography>
                </IconButton>
              </NavLink>
            </MenuItem>
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
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#f5f5f5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#4e575f",
              display: { xs: "none", sm: "block" },
            }}
          >
            <NavLink to="/">MERN-Blog</NavLink>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#4e575f" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "#4e575f",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          {/* {userName && (
            <LoginIcon
              firstLetter={firstName.charAt(0)}
              lastLetter={lastName.charAt(0)}
            />
          )} */}
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
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
