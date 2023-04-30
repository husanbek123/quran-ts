/// <reference path="../../namespaces.tsx" />
import React, { ReactNode, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import useStore from "../../Store";

type Props = {
  children?: ReactNode;
} & Interfaces.AudioAyah &
  Interfaces.ArabicAndUzbekSurah;

let Ayah: React.FC<Props> = ({
  arabic_text,
  numberInSurah,
  text,
  audio,
  number, // bu umumiy id
  sura, // string bolgani uchun number ga o'girib ishlatiladi.
}: Props) => {
  // text is wrong
  let audioTag = useRef<any>();
  let progressTag = useRef<any>();
  let {
    currentAyah,
    isPlaying,
    setIsPlaying,
    setCurrentAyah,
    setCurrentSurah,
    fontSize,
    fontSizeArabic,
  } = useStore((state) => state);

  let interval: number;

  useEffect(() => {
    interval = setInterval(() => {
      if (progressTag.current) {
        progressTag.current!.value = audioTag.current?.currentTime;
      }
    }, 500);
    if (currentAyah == number) {
      console.log(true);
      audioTag?.current?.play();
      setIsPlaying(true);
    }
  }, [currentAyah]);

  function Play() {
    isPlaying ? audioTag?.current?.pause() : audioTag?.current?.play();
    setCurrentAyah(number);
    setCurrentSurah(Number(sura));
    setIsPlaying(!isPlaying);
  }

  function Minus() {
    audioTag.current.currentTime = audioTag?.current?.currentTime - 5;
  }

  function Plus() {
    audioTag.current.currentTime = audioTag?.current?.currentTime + 5;
  }

  function AudioEnded() {
    clearInterval(interval);
    setIsPlaying(false);
    audioTag.current.currentTime = 0;
    setCurrentAyah(currentAyah + 1);
  }

  function ProgressOnChange() {
    setIsPlaying(false);
    audioTag.current.currentTime = progressTag.current!.value;
  }

  return (
    <>
      <div className={styles.ayah}>
        <span>{numberInSurah}</span>
        <h3
          style={{
            fontSize: fontSizeArabic!,
          }}
        >
          {arabic_text}
        </h3>
        <p
          style={{
            fontSize: fontSize!,
          }}
        >
          {/* {text?.slice(2, Infinity)} */}
          {text}
        </p>
        <audio src={audio} ref={audioTag} onEnded={AudioEnded}></audio>{" "}
        {/* site da ko'rinmaydi */}
        <input
          type="range"
          defaultValue={0}
          max={audioTag?.current?.duration}
          className={styles.progress}
          ref={progressTag}
          onChange={ProgressOnChange}
        />
        <div>
          {/* <span>{String(audioTag?.current?.duration)}</span> */}
          <button onClick={Minus}>-5</button>
          <button onClick={Play}>
            {currentAyah == number && isPlaying ? "⏸" : "⏯"}
          </button>
          <button onClick={Plus}>+5</button>
        </div>
      </div>
    </>
  );
};
export default Ayah;
