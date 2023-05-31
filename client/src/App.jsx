import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./styles/main.module.scss";

import Header from "./components/Header";
import Post from "./components/post";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <main className={styles.main}>
            <Header />
            <Post />
          </main>
        }
      />
      <Route path={"/login"} element={<div>Login</div>} />
      <Route path={"/register"} element={<div>Register</div>} />
    </Routes>
  );
}

export default App;
