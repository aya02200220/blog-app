import { lazy } from "react";
// import toast, { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContextProvider } from "./components/UserContext";
import Box from "@material-ui/core/Box";

import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";

function App() {
  const theme = createTheme({
    palette: {
      grey: {
        100: "#ffffff", // grey[100] のデフォルト色を白に変更
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#333", // この色はDrawerの背景色に適用されます
            color: "#fff",
          },
        },
      },
    },
    typography: {
      fontFamily: "REM, Arial, sans-serif",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const LoginPage = lazy(() => import("./components/Pages/LoginPage2"));
  const AccountPage = lazy(() => import("./components/Pages/AccountPage"));
  const SecurityPage = lazy(() => import("./components/Pages/SecurityPage"));
  const RegisterPage = lazy(() => import("./components/Pages/RegisterPage2"));
  const CreatePost = lazy(() => import("./components/Pages/CreatePost"));
  const PostPage = lazy(() => import("./components/Pages/PostPage"));
  const FavoritePage = lazy(() => import("./components/Pages/FavoritePage"));
  const YourPosts = lazy(() => import("./components/Pages/YourPosts"));
  const EditPost = lazy(() => import("./components/Pages/EditPost"));

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          {/* <Toaster /> */}
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/yourposts" element={<YourPosts />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/security" element={<SecurityPage />} />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
