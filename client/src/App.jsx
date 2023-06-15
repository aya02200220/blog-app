import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import styles from "./styles/main.module.scss";

import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";
// import LoginPage from "./components/Pages/LoginPage";
import LoginPage from "./components/Pages/LoginPage2";
// import RegisterPage from "./components/Pages/RegisterPage";
import RegisterPage from "./components/Pages/RegisterPage2";

import CreatePost from "./components/Pages/CreatePost";
import { UserContextProvider } from "./components/UserContext";
import PostPage from "./components/Pages/PostPage";
import { EditPost } from "./components/Pages/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
