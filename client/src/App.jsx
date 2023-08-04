import { lazy } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContextProvider } from "./components/UserContext";
import Box from "@material-ui/core/Box";

import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";
// import EditPost from "./components/Pages/EditPost";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Barlow, Arial, sans-serif",
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
          <Toaster />
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
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
