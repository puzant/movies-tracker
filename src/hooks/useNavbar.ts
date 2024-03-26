import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import useUserStore from "@/store/useUserStore";
import useDeleteSessionMutation from "@/mutations/useDeleteSessionMutation";

const useNavbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, sessionId, username, accentColor } = useUserStore();

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [toggleSearchBar, setToggleSearchBar] = React.useState<boolean>(false);

  const { deleteSessionMutation } = useDeleteSessionMutation();

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && /[a-zA-Z0-9]/.test(searchValue)) {
      setSearchValue("");
      setToggleSearchBar(!toggleSearchBar);
      navigate(`/search-results?query=${searchValue}`);
    }
  };

  return {
    t,
    i18n,
    deleteSessionMutation,
    isAuthenticated,
    sessionId,
    username,
    accentColor,
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    toggleSearchBar,
    setToggleSearchBar,
    handleEnterKeyPress,
  };
};

export default useNavbar;
