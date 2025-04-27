import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useUserStore from "@/store/useUserStore";

const usePreferencesDialog = (onClose: () => void) => {
  const { i18n, t } = useTranslation();
  const { accentColor, setAccentColor, fontStyle, setFontStyle } = useUserStore();
  const accentColors: string[] = ["#0177d2", "#01b4e4", "#01d277", "#d27701", "#d40242", "#805be7"];

  const [selectedColor, setSelectedColor] = React.useState<string>(accentColor);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(i18n.language);
  const [selectedFontStyle, setSelectedFontStyle] = React.useState<string>(fontStyle);

  const handleUpdatePreferences = () => {
    setAccentColor(selectedColor);
    setFontStyle(selectedFontStyle);
    i18n.changeLanguage(selectedLanguage);
    onClose();
    toast(t("preference_saved_message"));
  };

  return {
    accentColors,
    t,
    accentColor,
    selectedColor,
    setSelectedColor,
    selectedLanguage,
    setSelectedLanguage,
    selectedFontStyle,
    setSelectedFontStyle,
    handleUpdatePreferences,
  };
};

export default usePreferencesDialog;
