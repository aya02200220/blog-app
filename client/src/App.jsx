import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

// import styles from "./styles/main.module.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";
// import LoginPage from "./components/Pages/LoginPage";
import LoginPage from "./components/Pages/LoginPage2";
// import RegisterPage from "./components/Pages/RegisterPage";
import RegisterPage from "./components/Pages/RegisterPage2";

import CreatePost from "./components/Pages/CreatePost";
import { UserContextProvider } from "./components/UserContext";
import PostPage from "./components/Pages/PostPage";
import FavoritePage from "./components/Pages/FavoritePage";
import YourPosts from "./components/Pages/YourPosts";
import { EditPost } from "./components/Pages/EditPost";

function App() {
  const theme = createTheme({
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

  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
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
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
