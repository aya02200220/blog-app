import { NavLink, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/main.module.scss";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { LoginIcon } from "./LoginIcon";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    toast.success("You are logged out!");
  }

  const userName = userInfo?.userName;

  return (
    <header className={styles.navBar}>
      <NavLink to="/" className={styles.logo}>
        MERN-Blog
      </NavLink>
      <nav className={styles.nav}>
        {userName && (
          <>
            <NavLink
              className={styles.nav1}
              to={userName ? "/create" : "/login"}
            >
              Create new post
            </NavLink>

            {/* <NavLink className={styles.nav1} to="/create">
              Create new post
            </NavLink> */}

            <a onClick={logout}>
              <LoginIcon letter={userName.charAt(0)} />
            </a>

            <a className={styles.nav3} onClick={logout}>
              Logout
              <FontAwesomeIcon
                className={styles.nav4}
                icon={faArrowRightFromBracket}
              />
            </a>
          </>
        )}
        {!userName && (
          <>
            <NavLink
              className={styles.nav1}
              to={userName ? "/create" : "/login"}
            >
              Create new post
            </NavLink>
            <NavLink className={styles.nav1} to="/login">
              Login
            </NavLink>
            <NavLink to="/register">Resister</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
