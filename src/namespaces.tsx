namespace Interfaces {
  export interface State {
    theme: string;
    currentSurah: number;
    currentAyah: number;
    currentAuthor: string;
    isPlaying: boolean;
    isOpen: boolean;
    defaultFontSize: string;
    fontSize: null | string;
    fontSizeArabic: null | string;
    translationLang: string;
    setTransLang: (data: string) => {
      translationLang: string;
    };
    setFontSizeArabic: (data: string) => {
      fontSizeArabic: string;
    };
    setIsOpen: (data: boolean) => {
      isOpen: boolean;
    };
    setFontSize: (data: string) => {
      fontSize: string;
    };
    setTheme: (data: string) => { theme: string };
    setCurrentSurah: (n: number) => { currentSurah: number };
    setAuthor: (author: string) => {
      currentAuthor: string;
    };
    setIsPlaying: (data: boolean) => {
      isPlaying: boolean;
    };
    setCurrentAyah: (data: number) => {
      currentAyah: number;
    };
  }
  export interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: "Meccan" | "Medinan";
    ayahs: AudioAyah[];
  }
  export interface AudioAyah {
    number: number;
    audio: string;
    audioSecondary: { 0: string };
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
  }
  export interface ArabicAndUzbekSurah {
    arabic_text: string;
    aya: string;
    footnotes: string;
    id: string;
    sura: string;
    translation: string;
  }
}
