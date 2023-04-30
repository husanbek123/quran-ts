import React from "react";
import styles from "./index.module.scss";
import GetData1 from "../../api/Query";
import useStore from "../../Store";
import Surah from "../../components/surah";
import AudioPlayer from "../../components/audioPlayer";
import Loading from "../../components/loading";

type Props = {};

let Surahs: React.FC<Props> = ({}: Props) => {
  let { currentAuthor, currentSurah } = useStore((state) => state);
  let { data, isLoading } = GetData1(
    ["quran"],
    `https://api.alquran.cloud/v1/quran/${currentAuthor}`
  );

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        {currentSurah !== 0 && <AudioPlayer />}
        <br />
        <div className={styles.surahs}>
          {data?.data?.surahs?.map((surah: Interfaces.Surah) => (
            <Surah {...surah} />
          ))}
        </div>
      </>
    );
  }
};
export default Surahs;
