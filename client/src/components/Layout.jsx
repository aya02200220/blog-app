import React, { useState, useContext, useEffect, Suspense } from "react";
import { UserContext } from "./UserContext";
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
  // const [userInfoString, setUserInfoString] = useState(null);

  const [userData, setUserData] = useState({
    firstName: null,
    lastName: null,
    userName: null,
    userIcon: null,
  });

  // console.log("Layout:", userData.userName);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfoObj = JSON.parse(userInfoString);
      // setUserInfo(userInfoObj);
      setUserData((prevState) => ({
        ...prevState,
        firstName: userInfoObj.firstName,
      }));
      setUserData((prevState) => ({
        ...prevState,
        lastName: userInfoObj.lastName,
      }));
      setUserData((prevState) => ({
        ...prevState,
        userName: userInfoObj.email,
      }));
      setUserData((prevState) => ({
        ...prevState,
        userIcon: userInfoObj.userIcon,
      }));
    }
  }, [userInfo]);

  // console.log("userData.userName:", userData.userName);

  useEffect(() => {
    if (userData.userName) {
      // ログイン処理が完了している場合にユーザー情報を取得
      fetch("http://localhost:4000/profile", {
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
        .then((userInfo) => {
          setUserInfo(userInfo);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
          // 必要に応じてユーザーへのエラー通知を行うなど、ここでのエラーハンドリングを強化できます
        });
    }
  }, [userData.userName]);

  return (
    <>
      <ToastContainer />
      <MemoizedAppBar
        open={open}
        toggleDrawer={toggleDrawer}
        userData={userData}
      />
      <MemoizedMenuDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        userData={userData}
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
