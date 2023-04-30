import "./App.scss";
import Layout from "./layout";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Surahs from "./pages/Surahs";
import SingleSurah from "./pages/SingleSurah";
import NamozVaqtlari from "./pages/Namoz-vaqtlari";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./lang/uzbek.json";
import ru from "./lang/russian.json";
import en from "./lang/english.json";
import SettingsModal from "./components/settings";
import GetData1 from "./api/Query";
import useStore from "./Store";

i18next.use(initReactI18next).init({
  lng: "uz",
  debug: true,
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  },
});

function App() {
  let { currentAuthor, isOpen, setIsOpen } = useStore((state) => state);
  GetData1(
    ["quran"],
    `https://api.alquran.cloud/v1/quran/${currentAuthor}`
  );

  return (
    <Layout>
      {isOpen && <SettingsModal isOpenFunc={setIsOpen} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surahs" element={<Surahs />} />
        <Route path="/surahs/:surahname" element={<SingleSurah />} />
        <Route path="/surahs/namoz-times" element={<NamozVaqtlari />} />{" "}
        {/* Logikasini keyinroq o'yliman */}
      </Routes>
    </Layout>
  );
}
export default App;
