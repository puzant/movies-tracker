import { useTranslation } from "react-i18next";
import useUserStore from "@/store/useUserStore";
import { Filters } from "@/components";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const FiltersDialog = ({
  onClose,
  openDialog,
}: {
  onClose: () => void;
  openDialog: boolean;
}) => {
  const { t } = useTranslation();
  const { accentColor } = useUserStore();

  return (
    <Dialog fullScreen onClose={onClose} open={openDialog}>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{t("sorting_and_filters")}</span>
          <CloseIcon
            onClick={onClose}
            sx={{ color: "#5A5A5A", cursor: "pointer" }}
          />
        </div>
      </DialogTitle>

      <DialogContent>
        <Filters />
      </DialogContent>

      <DialogActions>
        <button
          onClick={onClose}
          style={{ background: accentColor }}
          className="rounded-md w-full px-4 py-2 shadow-md text-white"
        >
          {t("apply")}
        </button>
      </DialogActions>
    </Dialog>
  );
};
