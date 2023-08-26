import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { LocalStorageRemove } from "./Functions/LocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { SERVER_URL } from "../Constants";

import { toast, ToastContainer } from "react-toastify";

import { styled } from "@mui/material/styles";

import { Toolbar, IconButton, Divider, Box, Collapse } from "@mui/material/";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArticleIcon from "@mui/icons-material/Article";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import {
  Link as RouterLink,
  // LinkProps as RouterLinkProps,
} from "react-router-dom";

const DRAWER_WIDTH = 210;
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
  const location = useLocation();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <MuiListItemButton
      component={RouterLink}
      to={to}
      {...rest}
      sx={{
        position: "relative",
        transition: "background-color 0.4s",
        ...(to === location.pathname && {
          backgroundColor: "#D8A7B1",

          "& *": {
            color: "#333",
            fontWeight: "700",
          },
        }),
        "&:hover": {
          backgroundColor: "#E2808A",
        },
        ...rest.sx,
      }}
    >
      {children}
      {/* {to === location.pathname} */}
    </MuiListItemButton>
  );
};

export const MenuDrawer = ({ open, toggleDrawer, userData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [showSecurity, setShowSecurity] = useState(false);

  const { setUserInfo, userInfo } = useContext(UserContext);
  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  const userName = userData?.userName;
  const userId = userData?.userId;

  // console.log("userId::::::**********", userId);
  // console.log(showSecurity);

  useEffect(() => {
    // console.log("currentPath", currentPath, userId);
    if (
      currentPath === `/post/account/${userId}` ||
      currentPath === `/security` ||
      currentPath === `/profile` ||
      currentPath === `/change-email`
    ) {
      setShowSecurity(true);
    } else {
      setShowSecurity(false);
    }
  }, [currentPath]);

  async function logout() {
    const response = await fetch(`${SERVER_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (response.ok) {
      LocalStorageRemove();
      setUserInfo(null);

      navigate("/temp");
      setTimeout(() => navigate("/"), 0);
      toast.success("You are Signed out!", {
        position: "top-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Logout failed!");
    }
  }

  const handleClick = () => {
    if (!userName) {
      toast.info("Sign in to create a new post!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
          <List
            component="nav"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <ListItemButton to="/">
              <ListItemIcon>
                <HomeIcon sx={{ color: "#fff", pl: 1, fontSize: "31px" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            {/* <ListItemButton>
              <ListItemIcon>
                <BorderColorIcon
                  sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                />
              </ListItemIcon>
              <NavLink
                to={userName ? "/create" : "/login"}
                onClick={handleClick}
                activeStyle={{ color: "#E588A3" }} // ここでアクティブな場合のスタイルを指定
              >
                <ListItemText primary="Create Post" />
              </NavLink>
            </ListItemButton> */}
            {userName && (
              <>
                <ListItemButton to="/reading-list">
                  <ListItemIcon>
                    <BookmarkIcon
                      sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Reading list" />
                </ListItemButton>

                <ListItemButton
                  to={`/post/account/${userId}`}
                  sx={
                    currentPath === "/profile" ||
                    currentPath === "/security" ||
                    currentPath === "/change-email"
                      ? { backgroundColor: "#ac7a84" }
                      : {}
                  }
                >
                  <ListItemIcon>
                    <PersonOutlineIcon
                      sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="My Account" />
                </ListItemButton>

                <Collapse in={showSecurity} timeout="auto" unmountOnExit>
                  <ListItemButton
                    to="/profile"
                    sx={
                      currentPath === "/profile"
                        ? { backgroundColor: "#D8A7B1" }
                        : { backgroundColor: "#ac7a84" }
                    }
                  >
                    <ListItemIcon>
                      <PersonOutlineIcon
                        sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>

                  <ListItemButton
                    to="/security"
                    sx={
                      currentPath === "/security"
                        ? { backgroundColor: "#D8A7B1" }
                        : { backgroundColor: "#ac7a84" }
                    }
                  >
                    <ListItemIcon>
                      <LockIcon
                        sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Password" />
                  </ListItemButton>

                  <ListItemButton
                    to="/change-email"
                    sx={
                      currentPath === "/change-email"
                        ? { backgroundColor: "#D8A7B1" }
                        : { backgroundColor: "#ac7a84" }
                    }
                  >
                    <ListItemIcon>
                      <MailOutlineIcon
                        sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Email" />
                  </ListItemButton>
                </Collapse>
                {userName && (
                  <ListItemButton to={"/create"}>
                    <ListItemIcon>
                      <BorderColorIcon
                        sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Create Post" />
                  </ListItemButton>
                )}
              </>
            )}
            {/* ///////////////////////////////////////////////////////////////// */}

            {userName && (
              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    // backgroundColor: "#a53939",
                    backgroundColor: "#c1c1c1c1",
                    color: "#fff",
                  }}
                >
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
                <Box sx={{ backgroundColor: "#7090BC", color: "#fff" }}>
                  <ListItemButton to="/login">
                    <ListItemIcon>
                      <LoginIcon
                        sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                  </ListItemButton>
                </Box>

                <Box sx={{ backgroundColor: "#749AA3", color: "#fff" }}>
                  <ListItemButton to="/register">
                    <ListItemIcon>
                      <PersonAddIcon
                        sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
