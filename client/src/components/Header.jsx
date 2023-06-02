import { NavLink, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/main.module.scss";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  // const [userName, setUserName] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const userName = userInfo?.userName;

  return (
    <header className={styles.navBar}>
      <NavLink to="/" className={styles.logo}>
        My Blog
      </NavLink>
      <nav className={styles.nav}>
        {userName && (
          <>
            <NavLink to="/create">Create new post</NavLink>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!userName && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Resister</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
