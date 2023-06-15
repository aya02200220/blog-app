// import Header from "./Header";
import Header from "./Header2";
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
