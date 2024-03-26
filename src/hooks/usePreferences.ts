import React from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "@/utils";
import { languages } from "@/utils/constants";
import ReactCountryFlag from "react-country-flag";
import useUserStore from "@/store/useUserStore";

const usePreferences = (onClose: () => void) => {
  const { i18n, t } = useTranslation();
  const { accentColor, setAccentColor } = useUserStore();

  const [selectedColor, setSelectedColor] = React.useState<string>(accentColor);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(i18n.language);

  const handleUpdatePreferences = () => {
    setAccentColor(selectedColor);
    i18n.changeLanguage(selectedLanguage);
    onClose();
  };

  return {
    i18n,
    t,
    accentColor,
    setAccentColor,
    selectedColor,
    setSelectedColor,
    selectedLanguage,
    setSelectedLanguage,
    handleUpdatePreferences,
    onClose,
  };
};
