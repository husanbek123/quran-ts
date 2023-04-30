import React, { ReactNode } from "react";
import styles from "./index.module.scss";
import { createPortal } from "react-dom";
import { Button, Select, Space } from "antd";
import GetData1 from "../../api/Query";
import useStore from "../../Store";
// import { useTranslation } from "react-i18next";

type Props = {
  children?: ReactNode;
  isOpenFunc: Function;
};

let SettingsModal: React.FC<Props> = ({ isOpenFunc }: Props) => {
  // let { t } = useTranslation();
  console.log();

  let readers = GetData1(
    ["readers"],
    "https://api.alquran.cloud/v1/edition/format/audio"
  );
  let {
    setTransLang,
    translationLang,
    currentAuthor,
    defaultFontSize,
    fontSize,
    setFontSize,
    setAuthor,
    // setFontSizeArabic,
    setIsOpen,
  } = useStore((state) => state);

  const handleChangeAuthor = (value: string) => {
    console.log(value);
    setAuthor(value);
  };

  const handleChangeFontSize = (value: string) => {
    setFontSize(value);
  };
  // const handleChangeFontSize2 = (value: string) => {
  //   setFontSizeArabic(value);
  // };

  interface Option {
    englishName: string;
    identifier: string;
  }
  let fontSizes: string[] = [
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "28px",
  ];

  function handleChange(value: string) {
    console.log(value);

    setTransLang(value);
  }

  // let langs: string[] = ["uz", "ru", "en"];

  return createPortal(
    <>
      <div className={styles.modal}>
        <Space className={styles.inner} wrap>
          <p>Select Author</p>
          <Select
            className={styles.select}
            defaultValue={currentAuthor}
            style={{ width: "200px" }}
            onChange={handleChangeAuthor}
            options={readers?.data?.data.map((option: Option) => ({
              label: option.englishName,
              value: option.identifier,
            }))}
          />
          {/* <p>Select Arabic text size</p>
          <Select
            className={styles.select}
            defaultValue={fontSize ? fontSize : defaultFontSize}
            style={{ width: "200px" }}
            onChange={handleChangeFontSize2}
            options={fontSizes.map((option: string) => ({
              label: option,
              value: option,
            }))}
          /> */}

          <p>Select translation's size</p>
          <Select
            className={styles.select}
            defaultValue={fontSize ? fontSize : defaultFontSize}
            style={{ width: "200px" }}
            onChange={handleChangeFontSize}
            options={fontSizes.map((option: string) => ({
              label: option,
              value: option,
            }))}
          />
          <p>Select language</p>
          {/* <Select
            className={styles.select}
            defaultValue={i18next.language}
            style={{ width: "200px" }}
            onChange={(e) => i18next.changeLanguage(e)}
            options={langs.map((option: string) => ({
              value: option,
              label: option.toUpperCase(),
            }))}
          /> */}
          <Select
            defaultValue={translationLang}
            style={{
              width: 250,
            }}
            onChange={handleChange}
            options={[
              {
                value: "uzbek",
                label: "Uzbek",
              },
              {
                value: "ru.kuliev",
                label: "Русский",
              },
              {
                value: "en.ahmedali",
                label: "English",
              },
            ]}
            className={styles.selector}
          />
        </Space>
        <Button
          htmlType="button"
          type="primary"
          onClick={() => setIsOpen(false)}
        >
          Apply
        </Button>
      </div>
      <div
        className={styles.modalClose}
        onClick={() => isOpenFunc(false)}
      ></div>
    </>,
    document.getElementById("modals") as Element
  );
};
export default SettingsModal;
