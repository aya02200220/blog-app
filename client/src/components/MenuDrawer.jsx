import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { LocalStorage, LocalStorageRemove } from "./Functions/LocalStorage";
import { NavLink, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import { Box, Button } from "@mui/material/";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import MenuIcon from "@mui/icons-material/Menu";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArticleIcon from "@mui/icons-material/Article";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { DRAWER_WIDTH } from "../constants";
import {
  Link as RouterLink,
  // LinkProps as RouterLinkProps,
} from "react-router-dom";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const ListItemButton = (props) => {
  const { to, children, ...rest } = props;
  return (
    <MuiListItemButton component={RouterLink} to={to} {...rest}>
      {children}
    </MuiListItemButton>
  );
};

export const MenuDrawer = ({ open, toggleDrawer, userName }) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    const response = await fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });

    if (response.ok) {
      LocalStorageRemove();

      navigate("/temp");
      setTimeout(() => navigate("/"), 0);
      toast.success("You are logged out!");
    } else {
      toast.error("Logout failed!");
    }
  }

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <Box>
        <List component="nav" sx={{ display: "flex", flexDirection: "column" }}>
          <ListItemButton to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton to={userName ? "/create" : "/login"}>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary="Create Post" />
          </ListItemButton>

          <ListItemButton to="/favorites">
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Bookmark" />
          </ListItemButton>

          <ListItemButton to="/yourposts">
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Your Posts" />
          </ListItemButton>

          <ListItemButton to="/account">
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>

          {!userName && (
            <>
              <ListItemButton to="/account" onClick={logout}>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>

              <Button
                onClick={logout}
                sx={{
                  marginTop: "15px",
                  width: "100%",
                  height: "40px",
                  borderRadius: 0,
                }}
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
              >
                Sign out
              </Button>
            </>
          )}
          {!userName && (
            <Box>
              <NavLink to={"/login"}>
                <Button
                  sx={{
                    marginTop: "15px",
                    width: "100%",
                    height: "40px",
                    borderRadius: 0,
                  }}
                  variant="contained"
                  color="success"
                  startIcon={<LoginIcon />}
                >
                  Sign In
                </Button>
              </NavLink>

              <NavLink to={"/register"}>
                <Button
                  sx={{
                    marginTop: "15px",
                    width: "100%",
                    height: "40px",
                    borderRadius: 0,
                  }}
                  variant="contained"
                  // color="success"
                  startIcon={<PersonAddIcon />}
                >
                  Sign up
                </Button>
              </NavLink>
            </Box>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
