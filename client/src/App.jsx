import { lazy } from "react";
import { ToastContainer } from "react-toastify";

import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContextProvider } from "./components/UserContext";
import { Box } from "@mui/material";

import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";

function App() {
  const theme = createTheme({
    palette: {
      grey: {
        100: "#f7f7f7",
        // 100: "#fff", // grey[100] のデフォルト色を白に変更
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

  const LoginPage = lazy(() => import("./components/Pages/LoginPage"));
  const AccountPage = lazy(() => import("./components/Pages/AccountPage"));
  const ChangePassword = lazy(() =>
    import("./components/Pages/ChangePassword")
  );
  const ChangeEmail = lazy(() => import("./components/Pages/ChangeEmail"));
  const RegisterPage = lazy(() => import("./components/Pages/RegisterPage"));
  const CreatePost = lazy(() => import("./components/Pages/CreatePost"));
  const PostPage = lazy(() => import("./components/Pages/PostPage"));
  const FavoritePage = lazy(() => import("./components/Pages/FavoritePage"));
  const AuthorPage = lazy(() => import("./components/Pages/AuthorPage"));
  const EditPost = lazy(() => import("./components/Pages/EditPost"));
  const ForgotPassword = lazy(() =>
    import("./components/Pages/ForgotPassword")
  );
  const ResetPasswordPage = lazy(() =>
    import("./components/Pages/ResetPassword")
  );

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
              <Route path="/reading-list" element={<FavoritePage />} />
              {/* <Route path="/yourposts" element={<YourPosts />} /> */}
              <Route path="/post/account/:accountId" element={<AuthorPage />} />
              <Route path="/profile" element={<AccountPage />} />
              <Route path="/security" element={<ChangePassword />} />
              <Route path="/change-email" element={<ChangeEmail />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:resetToken"
                element={<ResetPasswordPage />}
              />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
