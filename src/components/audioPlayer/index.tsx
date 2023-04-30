import { useRef, useEffect, useState } from "react";
import useStore from "../../Store";
import styles from "./index.module.scss";
import GetData1 from "../../api/Query";

type Props = {};

export default function AudioPlayer({}: Props) {
  let audioTag = useRef<HTMLAudioElement | any>();
  let progressTag = useRef<any>();
  let [nextOrNot, setNextOrNot] = useState<boolean>();
  let [isInfinity, setIsInfinity] = useState<boolean>(false);
  let [duration, setDuration] = useState<number>(10000);
  let {
    currentAyah,
    isPlaying,
    setIsPlaying,
    currentAuthor,
    setCurrentAyah,
    currentSurah,
    setCurrentSurah,
  } = useStore((state) => state);

  let { data, isFetching } = GetData1(
    ["quran", `${currentAuthor}`],
    `https://api.alquran.cloud/v1/quran/${currentAuthor}`
  );

  let Surahs = data?.data?.surahs;
  let Surah: Interfaces.Surah = data?.data?.surahs?.find(
    (surah: Interfaces.Surah) => surah.number == currentSurah
  );
  let interval: number | undefined;

  useEffect(() => {
    let progTag = document.getElementById("progress") as HTMLInputElement;
    if (progTag) {
      progTag.value = String(audioTag?.current?.currentTime * 1000);
    }
    if (audioTag?.current?.duration) {
      setDuration(audioTag?.current?.duration * 1000);
    }

    interval = setInterval(() => {
      let progTag = document.getElementById("progress") as HTMLInputElement;

      if (progTag) {
        progTag.value = String(audioTag.current?.currentTime * 1000);
      }
    }, 10);

    if (nextOrNot == false) {
      setCurrentAyah(Surah?.ayahs?.length);
      setNextOrNot(true);
    }
  }, [currentAyah, currentSurah, isInfinity]);

  useEffect(() => {
    // let a: HTMLAudioElement = document.getElementById("audio") as HTMLAudioElement;
    if (audioTag.current?.duration) {
      audioTag.current?.addEventListener("canplay", () => {
        setDuration(audioTag?.current?.duration * 1000);
      });
    } else {
      console.log(false, 1000000);
    }
    if (isInfinity) {
      if (audioTag.current.duration) {
        setDuration(audioTag.current?.duration * 1000);
        console.log("test1", 123123123123);
      }
      Play();
    } else {
      if (audioTag.current?.duration) {
        setDuration(audioTag.current?.duration * 1000);
        console.log("test2", 2222222222);
      }
      if (isPlaying) {
        Play();
      } else {
        Stop();
      }
    }
  }, [currentAyah, isInfinity, isPlaying]);

  useEffect(() => {
    audioTag?.current?.load();
  }, [currentAuthor]);

  useEffect(() => {
    console.log(duration);
  }, [duration]);

  function Play() {
    // let a = document.getElementById("audio") as HTMLAudioElement;
    setDuration(audioTag.current?.duration * 1000);

    // setDuration(audioTag?.current?.duration * 1000);
    audioTag?.current?.play();
    setIsPlaying(true);

    // if (isInfinity) {
    //   setIsInfinity(false);
    // } else {
    // }
  }

  function Stop() {
    audioTag?.current?.pause();
    setIsPlaying(false);
    setIsInfinity(false);
  }

  function Minus() {
    audioTag.current.currentTime = audioTag?.current?.currentTime - 5;
  }

  function Plus() {
    audioTag.current.currentTime = audioTag?.current?.currentTime + 5;
  }

  function AudioEnded() {
    clearInterval(interval);
    audioTag.current.currentTime = 0;

    if (currentAyah == Surah?.ayahs?.length) {
      setCurrentSurah(currentSurah + 1);
      setCurrentAyah(1);
    } else {
      setCurrentAyah(currentAyah + 1);
    }

    if (!isInfinity) {
      setIsPlaying(false);
    } else {
    }
  }

  function ProgressOnChange() {
    // let progTag = document.getElementById("progress") as HTMLInputElement;

    setIsPlaying(true);
    audioTag.current.play();
    audioTag.current.currentTime = String(progressTag!.current!.value / 1000);
  }

  function NextAudio() {
    setIsPlaying(false);
    audioTag.current.load();
    setCurrentAyah(currentAyah + 1);

    if (currentAyah >= Surah.ayahs.length) {
      NextSurah();
    }
  }
  function PrevAudio() {
    if (isInfinity) {
      setIsPlaying(false);
      setDuration(audioTag?.current?.duration * 1000);
    }
    if (currentAyah <= 1) {
      console.log("91283017203710293709172");
      PrevSurah();
    } else {
      setCurrentAyah(currentAyah - 1);
      setDuration(audioTag?.current?.duration * 1000);
    }
  }

  function NextSurah() {
    data?.data?.surahs?.find(
      (surah: Interfaces.Surah) => surah.number == currentSurah
    )?.ayahs?.length;
    setCurrentSurah(currentSurah + 1);
    setCurrentAyah(1);
  }

  function PrevSurah() {
    setNextOrNot(false);
    setCurrentSurah(currentSurah - 1);
  }

  function InfinityMode() {
    setIsInfinity(!isInfinity);
    setIsPlaying(true);
  }

  return (
    <div>
      <div className={styles.ayah}>
        {isFetching ? (
          "Loading..."
        ) : (
          <>
            <button onClick={InfinityMode}>{isInfinity ? "ON" : "OFF"}</button>
            <h4>
              {Surah?.englishName}, {currentAyah + "/" + Surah?.ayahs?.length}
            </h4>
            <audio
              src={
                Surahs?.find(
                  (surah: Interfaces.Surah) => surah.number == currentSurah
                )?.ayahs[currentAyah - 1]?.audio
              }
              ref={audioTag}
              onEnded={AudioEnded}
              id="audio"
              // autoPlay={!Number.isNaN(duration)}
            ></audio>{" "}
            {/* site da ko'rinmaydi */}
            <input
              type="range"
              max={duration}
              className={styles.progress}
              ref={progressTag}
              onChange={ProgressOnChange}
              id="progress"
            />
            <div>
              {/* <span>{String(audioTag?.current?.duration)}</span> */}
              <button onClick={PrevSurah}>◀◀</button>
              <button onClick={PrevAudio}>◀</button>
              <button onClick={Minus}>-5</button>
              <button onClick={isPlaying ? Stop : Play}>
                {isPlaying ? "⏸" : "⏯"}
              </button>
              <button onClick={Plus}>+5</button>
              <button onClick={NextAudio}>▶</button>
              <button onClick={NextSurah}>▶▶</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
