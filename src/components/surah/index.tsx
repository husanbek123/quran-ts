/// <reference path="../../namespaces.tsx" />
import React, { ReactNode } from "react";
import styles from "./index.module.scss";
// import GetData1 from "../../api/Query";
import useStore from "../../Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  children?: ReactNode;
} & Interfaces.Surah;

let Surah: React.FC<Props> = ({
  englishName,
  name,
  revelationType,
  ayahs,
  number,
}: Props) => {
  let { setCurrentSurah } = useStore((state) => state);
  // let { data } = GetData1(
  //   ["quran"],
  //   `https://api.alquran.cloud/v1/quran/${currentAuthor}`
  // );
  let { t } = useTranslation();
  return (
    <Link to={`/surahs/${englishName}`} onClick={() => setCurrentSurah(number)}>
      <div className={styles.surah_card}>
        <h5>
          {englishName} <span>{ayahs.length}</span>
        </h5>
        <h2>{name}</h2>
        <h2>
          {number}{" "}
          <span>
            {revelationType == "Meccan"
              ? t("revelationMeccan")
              : t("revelationMedinan")}
          </span>
        </h2>
      </div>
    </Link>
  );
};
export default Surah;
