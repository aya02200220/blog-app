import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { LocalStorage, LocalStorageRemove } from "./Functions/LocalStorage";
import { NavLink, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

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

export const MenuDrawer = ({ open, toggleDrawer, userData }) => {
  const navigate = useNavigate();

  const { setUserInfo, userInfo } = useContext(UserContext);
  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  const userName = userData?.userName;

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
          <ChevronLeftIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
      <Divider />

      <Box>
        <List component="nav" sx={{ display: "flex", flexDirection: "column" }}>
          <ListItemButton to="/">
            <ListItemIcon>
              <HomeIcon sx={{ color: "#fff", pl: 1, fontSize: "31px" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton to={userName ? "/create" : "/login"}>
            <ListItemIcon>
              <BorderColorIcon
                sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Create Post" />
          </ListItemButton>

          <ListItemButton to="/favorites">
            <ListItemIcon>
              <BookmarkIcon sx={{ color: "#fff", pl: 1, fontSize: "31px" }} />
            </ListItemIcon>
            <ListItemText primary="Bookmark" />
          </ListItemButton>

          <ListItemButton to="/yourposts">
            <ListItemIcon>
              <ArticleIcon sx={{ color: "#fff", pl: 1, fontSize: "31px" }} />
            </ListItemIcon>
            <ListItemText primary="Your Posts" />
          </ListItemButton>

          <ListItemButton to="/account">
            <ListItemIcon>
              <PersonOutlineIcon
                sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
              />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>

          {userName && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ backgroundColor: "#a53939", color: "#fff" }}>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon
                      sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItemButton>
              </Box>
            </Box>
          )}
          {!userName && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ backgroundColor: "#4d59a0", color: "#fff" }}>
                <ListItemButton to="/login">
                  <ListItemIcon>
                    <LoginIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Sign In" />
                </ListItemButton>
              </Box>

              <Box sx={{ backgroundColor: "#468041", color: "#fff" }}>
                <ListItemButton to="/register">
                  <ListItemIcon>
                    <PersonAddIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
