import React, { useState, useContext, useEffect, Suspense } from "react";
import { UserContext } from "./UserContext";
import { GetLocalStorage } from "./Functions/LocalStorage";
import { SERVER_URL } from "../Constants";
import { ToastContainer } from "react-toastify";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { AppBar } from "../components/AppBar";
import { MenuDrawer } from "../components/MenuDrawer";
import { Outlet } from "react-router-dom";

const MemoizedAppBar = React.memo(AppBar);
const MemoizedMenuDrawer = React.memo(MenuDrawer);

const Layout = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [open, setOpen] = useState(matches);

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { setUserInfo, userInfo } = useContext(UserContext);
  // const [userData, setUserData] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [bio, setBio] = useState("");
  // const [userIcon, setUserIcon] = useState("");
  // const [userId, setUserId] = useState("");

  const [userId, setUserId] = useState(() => {
    const localUserInfo = GetLocalStorage();
    return localUserInfo
      ? localUserInfo.id
        ? localUserInfo.id
        : localUserInfo._id
        ? localUserInfo._id
        : null
      : null;
  });

  useEffect(() => {
    if (userId) {
      // ログイン処理が完了している場合にユーザー情報を取得
      fetch(`${SERVER_URL}/profile`, {
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(
                `HTTP error! status: ${response.status}, message: ${text}`
              );
            });
          }
          return response.json();
        })
        .then((userData) => {
          setUserInfo(userData);
          // console.log("userData********", userData);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        });
    }
  }, [userId]);

  return (
    <>
      <ToastContainer />
      <MemoizedAppBar
        open={open}
        toggleDrawer={toggleDrawer}
        userData={userInfo}
      />
      <MemoizedMenuDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        userData={userInfo}
      />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </Box>
    </>
  );
};

export default Layout;
