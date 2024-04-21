import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useUserStore from "@/store/useUserStore";

const usePreferencesDialog = (onClose: () => void) => {
  const { i18n, t } = useTranslation();
  const { accentColor, setAccentColor } = useUserStore();
  const accentColors = ["#0177d2", "#01b4e4", "#01d277", "#d27701", "#d40242", "#805be7"];

  const [selectedColor, setSelectedColor] = React.useState<string>(accentColor);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(i18n.language);

  const handleUpdatePreferences = () => {
    setAccentColor(selectedColor);
    i18n.changeLanguage(selectedLanguage);
    onClose();
    toast("Prefernces saved!");
  };

  return {
    accentColors,
    t,
    accentColor,
    selectedColor,
    setSelectedColor,
    selectedLanguage,
    setSelectedLanguage,
    handleUpdatePreferences,
  };
};

export default usePreferencesDialog;
