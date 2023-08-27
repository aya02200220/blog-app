import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { LocalStorageRemove, GetLocalStorage } from "./Functions/LocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { SERVER_URL } from "../Constants";
import { logout } from "./Functions/Logout";

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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Link as RouterLink } from "react-router-dom";

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
          fontWeight: "700",
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
  const [userId, setUserId] = useState(false);

  const { setUserInfo, userInfo } = useContext(UserContext);

  // const [userId, setUserId] = useState(() => {
  //   const localUserInfo = GetLocalStorage();
  //   return localUserInfo ? localUserInfo.id : null;
  // });
  // const localUserInfo = GetLocalStorage();
  // console.log("localUserInfo", localUserInfo);

  // console.log("userData", userData);
  // console.log(!userData);

  function isEmpty(obj) {
    if (obj !== undefined && obj !== null) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    return true;
  }

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

  useEffect(() => {
    setUserId(userInfo?.id);
  }, [userInfo]);

  const callLogout = async () => {
    await logout(LocalStorageRemove, setUserInfo, navigate, toast);
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

            {!isEmpty(userInfo) && (
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
                    <AccountCircleIcon
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
                      <ContactPageIcon
                        sx={{ color: "#fff", pl: 1, fontSize: "31px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
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
              </>
            )}
            {/* ///////////////////////////////////////////////////////////////// */}

            {!isEmpty(userInfo) && (
              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    // backgroundColor: "#a53939",
                    backgroundColor: "#c1c1c1c1",
                    color: "#fff",
                  }}
                >
                  <ListItemButton onClick={callLogout}>
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
            {isEmpty(userInfo) && (
              <Box sx={{ mt: 2 }}>
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
