import { isMobile } from "@/utils";
import { languages } from "@/utils/constants";
import ReactCountryFlag from "react-country-flag";

import usePreferencesDialog from "@/hooks/usePreferencesDialog";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export const PreferencesDialog = ({
  onClose,
  openDialog,
}: {
  onClose: () => void;
  openDialog: boolean;
}) => {
  const {
    accentColors,
    t,
    accentColor,
    selectedColor,
    setSelectedColor,
    selectedLanguage,
    setSelectedLanguage,
    handleUpdatePreferences,
  } = usePreferencesDialog(onClose);

  return (
    <Dialog fullScreen={isMobile()} onClose={onClose} open={openDialog}>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold">{t("preferences")}</span>
          <CloseIcon onClick={onClose} sx={{ color: "#5A5A5A", cursor: "pointer" }} />
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

          <div className="grid grid-cols-6 mt-2 gap-6">
            {accentColors.map((color, index) => (
              <div
                data-testid={`accent-color-${index}`}
                style={{
                  background: color,
                }}
                className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => setSelectedColor(color)}
              >
                {color === selectedColor && <CheckIcon sx={{ color: "#fff" }} fontSize="large" />}
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
