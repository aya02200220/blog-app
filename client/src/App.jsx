import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import styles from "./styles/main.module.scss";

import Layout from "./components/Layout";
import IndexPage from "./components/Pages/IndexPage";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import CreatePost from "./components/Pages/CreatePost";
import { UserContextProvider } from "./components/UserContext";

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
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
