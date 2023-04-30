import React from "react";
import "./index.module.scss";
import { useParams } from "react-router-dom";
import GetData1 from "../../api/Query";
import useStore from "../../Store";
import styles from "./index.module.scss";
import Ayah from "../../components/ayah";
import Loading from "../../components/loading";

type Props = {};

let SingleSurah: React.FC<Props> = ({}: Props) => {
  let params = useParams();
  let { currentAuthor, currentSurah, translationLang } = useStore(
    (state) => state
  );
  let { data, isLoading } = GetData1(
    ["quran"],
    `https://api.alquran.cloud/v1/quran/${currentAuthor}`
  );

  let Surah: Interfaces.Surah = data?.data?.surahs?.find(
    (surah: Interfaces.Surah) => surah?.englishName == params.surahname
  );

  let { data: arabicText, isLoading: isLoadingUZ } = GetData1(
    [`currentSurah_${params.surahname}_${currentAuthor}_arabic`],
    `https://quranenc.com/api/v1/translation/sura/uzbek_mansour/${currentSurah}`
  );

  let surahText = GetData1(
    [`currentSurah_${params.surahname}_${currentAuthor}_${translationLang}`],
    translationLang == "uzbek"
      ? `https://quranenc.com/api/v1/translation/sura/uzbek_mansour/${Surah?.number}`
      : `https://api.alquran.cloud/v1/surah/${Surah?.number}/${translationLang}`
  );

  if (isLoading || isLoadingUZ || surahText.isLoading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.single_surah}>
        <h2>{Surah?.englishName}</h2>
        <br />
        <br />
        <div className={styles.surahs}>
          {Surah?.ayahs?.map((ayah: Interfaces.AudioAyah) => {
            let obj: Interfaces.ArabicAndUzbekSurah =
              arabicText?.result[ayah.numberInSurah - 1];
            return (
              <Ayah
                {...ayah}
                {...obj}
                text={
                  translationLang == "uzbek"
                    ? surahText?.data?.result[ayah.numberInSurah - 1]
                        ?.translation
                    : surahText?.data?.data?.ayahs[ayah.numberInSurah - 1]?.text
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
};
export default SingleSurah;
