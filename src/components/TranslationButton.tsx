import React from "react";
import { Select } from "antd";
import { useTranslation } from "../hooks/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const { Option } = Select;

interface TranslationButtonProps {
  classNames?: string;
  border?: boolean;
}

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

const TranslationButton: React.FC<TranslationButtonProps> = ({ classNames,border }) => {
  const { changeLanguage } = useTranslation();
  const [language, setLanguage] = React.useState("en");
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleChange = (value: string) => {
    setLanguage(value);
    changeLanguage(value);
  };

  return (
    <div className={classNames}>
      <Select
        value={language}
        onChange={handleChange}
        style={{ width: '100%', color: isDarkMode ? '#fff' : '#000' }}
        bordered={border}
        className={isDarkMode ? "dark-mode-select" : ""}
      >
        {languages.map((lang) => (
          <Option key={lang.code} value={lang.code}>
            <span style={{ marginRight: 8 }}>{lang.flag}</span>
            {lang.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default TranslationButton;
