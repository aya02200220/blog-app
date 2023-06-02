import { useState } from "react";
import toast from "react-hot-toast";

import FormControl from "@mui/material/FormControl";

import styles from "../../styles/main.module.scss";
import styles2 from "../../styles/register.module.css";
import Button from "../Buttons/Button.jsx";
import TextField from "@mui/material/TextField";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const data = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "content-Type": "application/json" },
    });
    if (data.status === 200) {
      toast.success("You are successfully registered!");
    } else {
      // toast.error("Registration failed");
      alert("Registration failed");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.loginForm} onSubmit={register}>
        <h1 className={styles.loginTitle}>Register</h1>
        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={styles.textUsername}
          required
          id="outlined-basic"
          label="User name"
          variant="outlined"
        />

        <TextField
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.textPassword}
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />

        <Button className={styles.registerButton} title={"Register"} />
      </form>
    </div>
  );
};

export default RegisterPage;
