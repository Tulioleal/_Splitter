import styles from "./Layout.module.scss";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <img
            src="/Splitter.png"
            alt="Splitter logo"
            className={styles.logo}
        />
        <Header />
      </div>
      {children}
    </>
  );
};

export default Layout;
