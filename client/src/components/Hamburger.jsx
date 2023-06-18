import * as React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SearchWindow } from "./SearchWindow";
import { UserContext } from "./UserContext";

import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArticleIcon from "@mui/icons-material/Article";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function Hamburger({ userName }) {
  const { setUserInfo, userInfo } = useContext(UserContext);

  const [isOpen, setIsOpen] = React.useState({
    right: false,
  });

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    setIsOpen({ ...isOpen, right: false }); // ログアウト後にメニューを閉じる
    toast.success("You are logged out!");
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen({ ...isOpen, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <NavLink to={userName ? "/create" : "/login"}>
            <ListItem disablePadding sx={{ marginBottom: "4px" }}>
              <ListItemButton>
                <ListItemIcon>
                  <BorderColorIcon color="4e575f" sx={{ marginLeft: "10px" }} />
                </ListItemIcon>
                <ListItemText primary={"Create Post"} />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink to={"/favorite"}>
            <ListItem disablePadding sx={{ marginBottom: "4px" }}>
              <ListItemButton>
                <ListItemIcon>
                  <BookmarkIcon color="4e575f" sx={{ marginLeft: "10px" }} />
                </ListItemIcon>
                <ListItemText primary={"Bookmark"} />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink to={"/favorite"}>
            <ListItem disablePadding sx={{ marginBottom: "4px" }}>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleIcon color="4e575f" sx={{ marginLeft: "10px" }} />
                </ListItemIcon>
                <ListItemText primary={"Your Posts"} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>

        <Divider />
        {userName && (
          <List>
            <NavLink to={"/favorite"}>
              <ListItem disablePadding sx={{ marginBottom: "4px" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonOutlineIcon
                      color="4e575f"
                      sx={{ marginLeft: "10px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={"Account Settings"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        )}
      </Box>
    </>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon sx={{ color: "#4e575f" }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={isOpen[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              sx={{ marginTop: "10px", display: { xs: "block", md: "none" } }}
            >
              <SearchWindow />
              <Divider sx={{ paddingTop: "10px" }} />
            </Box>

            {list(anchor)}
            {userName && (
              <Box sx={{ marginTop: "0px" }}>
                <Button
                  onClick={logout}
                  sx={{ marginTop: "15px", width: "100%", height: "40px" }}
                  variant="contained"
                  color="error"
                  startIcon={<LogoutIcon />}
                >
                  Sign out
                </Button>
              </Box>
            )}
            {!userName && (
              <Box sx={{ marginTop: "0px" }}>
                <NavLink to={"/login"} onClick={toggleDrawer("right", false)}>
                  <Button
                    sx={{ marginTop: "15px", width: "100%", height: "40px" }}
                    variant="contained"
                    color="success"
                    startIcon={<LoginIcon />}
                  >
                    Sign In
                  </Button>
                </NavLink>
              </Box>
            )}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
