import Header from "./Header";
import styles from "../styles/main.module.scss";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <main className={styles.main}>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
