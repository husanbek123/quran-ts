import React, { ReactNode } from "react";
import "./index.module.scss";
import Navbar from "../components/navbar";
import styles from "./index.module.scss";

type Props = {
  children: ReactNode;
};

let Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.cover}>
        <Navbar />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
