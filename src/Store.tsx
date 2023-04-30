/// <reference path="./namespaces.tsx" />
import { create } from "zustand";
import { persist } from "zustand/middleware";

let State: (set: Function) => Interfaces.State = (set: Function) => ({
  theme: "light",
  currentSurah: 0,
  currentAyah: 0,
  currentAuthor: "ar.alafasy",
  isPlaying: false,
  isOpen: false,
  defaultFontSize: "16px",
  fontSize: null,
  fontSizeArabic: null,
  translationLang: "uzbek",
  setTransLang: (data) => set({
    translationLang: data
  }),
  setFontSizeArabic: (data) =>
    set({
      fontSizeArabic: data,
    }),
  setFontSize: (data) =>
    set({
      fontSize: data,
    }),
  setIsOpen: (data) =>
    set({
      isOpen: data,
    }),
  setTheme: (data) =>
    set({
      theme: data,
    }),
  setCurrentSurah: (n) =>
    set({
      currentSurah: n,
    }),
  setAuthor: (author) =>
    set({
      currentAuthor: author,
    }),
  setIsPlaying: (data) =>
    set({
      isPlaying: data,
    }),
  setCurrentAyah: (data) =>
    set({
      currentAyah: data,
    }),
});

let useStore = create(
  persist(State, {
    name: "StateStore",
  })
);
export default useStore;
