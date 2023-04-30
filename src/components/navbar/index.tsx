import React, { ReactNode } from "react";
import "./index.module.scss";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import useStore from "../../Store";

type Props = {
  children?: ReactNode;
};

let Navbar: React.FC<Props> = ({}: Props) => {
  let { setIsOpen } = useStore((state) => state);

  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <NavLink to={"/"}>Bosh saxifa</NavLink>
        </li>
        <li>
          <NavLink to={"/surahs"}>Suralar</NavLink>
        </li>
        <li>
          <NavLink to={"/namoz-times"}>Namoz Vaqtlari</NavLink>
        </li>
        <i onClick={() => setIsOpen(true)} className="fa-solid fa-gear"></i>
      </ul>
    </div>
  );
};
export default Navbar;
