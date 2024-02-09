import React from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "@/utils";
import { languages } from "@/utils/constants";
import ReactCountryFlag from "react-country-flag";
import useUserStore from "@/store/useUserStore";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export const PreferencesDialog = ({
  onClose,
  openDialog,
}: {
  onClose: () => void;
  openDialog: boolean;
}) => {
  const { i18n, t } = useTranslation();
  const { accentColor, setAccentColor } = useUserStore();

  const [selectedColor, setSelectedColor] = React.useState<string>(accentColor);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(
    i18n.language
  );

  const handleUpdatePreferences = () => {
    setAccentColor(selectedColor);
    i18n.changeLanguage(selectedLanguage);
    onClose();
  };

  return (
    <Dialog fullScreen={isMobile()} onClose={onClose} open={openDialog}>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold">{t("preferences")}</span>
          <CloseIcon
            onClick={onClose}
            sx={{ color: "#5A5A5A", cursor: "pointer" }}
          />
        </div>
      </DialogTitle>

      <DialogContent>
        <section>
          <div className="font-bold text-xl">{t("language")}</div>

          <div className="flex flex-col gap-4 mt-2">
            {languages.map((l) => (
              <div
                onClick={() => setSelectedLanguage(l.iso_639_1)}
                className="flex items-center gap-1 border rounded-md shadow-md p-4 cursor-pointer"
              >
                {selectedLanguage === l.iso_639_1 && (
                  <div className="flex justify-center items-center rounded-full h-[20px] w-[20px] border-2 bg-[#172554]">
                    <CheckIcon sx={{ color: "#fff", fontSize: 12 }} />
                  </div>
                )}

                <ReactCountryFlag countryCode={l.flag} />
                <span>{l.english_name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="font-bold text-xl">{t("personalize")}</div>

          <div className="mt-1">{t("choose_accent_notice")}</div>

          <div className="text-lg mt-5">{t("select_your_color")}</div>
          <div className="flex gap-4 mt-2">
            {[
              "#0177d2",
              "#01b4e4",
              "#01d277",
              "#d27701",
              "#d40242",
              "#805be7",
            ].map((color) => (
              <div
                style={{
                  background: color,
                }}
                className="cursor-pointer w-[50px] h-[50px] rounded-full flex justify-center items-center"
                onClick={() => setSelectedColor(color)}
              >
                {color === selectedColor && (
                  <CheckIcon sx={{ color: "#fff" }} fontSize="large" />
                )}
              </div>
            ))}
          </div>
        </section>
      </DialogContent>

      <DialogActions>
        <button
          onClick={handleUpdatePreferences}
          style={{ background: accentColor }}
          className="rounded-md w-full px-4 py-2 shadow-md text-white"
        >
          {t("apply")}
        </button>
      </DialogActions>
    </Dialog>
  );
};
