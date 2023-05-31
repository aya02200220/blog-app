import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/main.module.scss";

const Header = () => {
  return (
    <header className={styles.navBar}>
      <a href="" className={styles.logo}>
        My Blog
      </a>
      <nav className={styles.nav}>
        <Link to="/login">Login</Link>
        <Link to="/register">Resister</Link>
      </nav>
    </header>
  );
};

export default Header;
