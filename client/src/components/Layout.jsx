// import Header from "./Header";
// import Header from "./Header2";
// import styles from "../styles/main.module.scss";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div>
//       <main className={styles.main}>
//         <Header />
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Container from "@mui/material/Container";
// import { Suspense, useState } from "react";
// import { AppBar } from "../components/AppBar";
// import { MenuDrawer } from "../components/MenuDrawer";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   const [open, setOpen] = useState(true);
//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <AppBar open={open} toggleDrawer={toggleDrawer} />
//       <MenuDrawer open={open} toggleDrawer={toggleDrawer} />
//       <Box
//         component="main"
//         sx={{
//           backgroundColor: (theme) =>
//             theme.palette.mode === "light"
//               ? theme.palette.grey[100]
//               : theme.palette.grey[900],
//           flexGrow: 1,
//           height: "100vh",
//           overflow: "auto",
//         }}
//       >
//         <Toolbar />
//         <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//           <Suspense fallback={<div>Loading...</div>}>
//             <Outlet />
//           </Suspense>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Layout;

import React, { useState, useContext, useEffect, Suspense } from "react";
import { UserContext } from "./UserContext";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { AppBar } from "../components/AppBar";
import { MenuDrawer } from "../components/MenuDrawer";
import { Outlet } from "react-router-dom";

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
  const [userInfoString, setUserInfoString] = useState(null);
  // const [firstName, setFirstName] = useState(null);
  // const [lastName, setLastName] = useState(null);
  // const [userName, setUserName] = useState(null);

  const [userData, setUserData] = useState({
    firstName: null,
    lastName: null,
    userName: null,
  });

  console.log("Layout:", userData.userName);

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
      // setFirstName(userInfoObj.firstName);
      // setLastName(userInfoObj.lastName);
      // setUserName(userInfoObj.email);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userData.userName) {
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
  }, [userData.userName]);

  return (
    <>
      <AppBar open={open} toggleDrawer={toggleDrawer} userData={userData} />
      <MenuDrawer open={open} toggleDrawer={toggleDrawer} userData={userData} />
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
        {/* <Toolbar /> */}
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
