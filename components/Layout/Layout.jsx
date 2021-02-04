import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
