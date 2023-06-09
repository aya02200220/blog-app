import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import styles from "../../styles/main.module.scss";
import TextField from "@mui/material/TextField";
import Button from "../Buttons/Button.jsx";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    const data = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "content-Type": "application/json" },
      credentials: "include",
    });
    if (data.status === 200) {
      data.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
      setRedirect(true);
      toast.success("You are logged in!");
    } else {
      toast.error("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <form className={styles.loginForm} onSubmit={login}>
          <h1 className={styles.loginTitle}>Login</h1>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.textUsername}
            required
            id="outlined-basic"
            label="User name"
            variant="filled"
          />

          <TextField
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.textPassword}
            required
            id="outlined-basic"
            label="Password"
            variant="filled"
          />

          <Button className={styles.registerButton} title={"Login"} />
        </form>
        <h3>Don't have account?</h3>
      </div>
    </>
  );
};

export default LoginPage;
