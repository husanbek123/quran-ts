import React from "react";
import "./index.module.scss";
import styles from "./index.module.scss";
import img from "../../assets/Shahadah.png";
import { useNavigate } from "react-router-dom";

type Props = {};

let Home: React.FC<Props> = ({}: Props) => {
  let navigate = useNavigate();
  return (
    <div className={styles.home}>
      <div className={styles.img}>
        <img src={img} alt="" />
      </div>
      <div>
        <button onClick={() => navigate("/surahs")} className={styles.btn}>
          Suralar
        </button>
        <button onClick={() => navigate("/namoz-times")} className={styles.btn}>
          Namoz vaqtlari
        </button>
      </div>
    </div>
  );
};
export default Home;
