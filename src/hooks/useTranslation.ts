import { useTranslation as useReactI18nextTranslation } from "react-i18next";

export const useTranslation = () => {
  const { t, i18n } = useReactI18nextTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return {
    t,
    changeLanguage,
  };
};
