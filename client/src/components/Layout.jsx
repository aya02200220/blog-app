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

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Suspense, useState } from "react";
import { AppBar } from "../components/AppBar";
import { MenuDrawer } from "../components/MenuDrawer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <MenuDrawer open={open} toggleDrawer={toggleDrawer} />
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
