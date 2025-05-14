import _ from "lodash";
import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import apiManager from "@/apiManager";
import useUserStore from "@/store/useUserStore";
import useDeleteSessionMutation from "@/mutations/useDeleteSessionMutation";
import { IMovieList } from "@/interfaces";

const useNavbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isAuthenticated, sessionId, username, accentColor } = useUserStore();

  const [suggestions, setSuggestions] = useState<IMovieList[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toggleSearchBar, setToggleSearchBar] = useState<boolean>(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

  const { deleteSessionMutation } = useDeleteSessionMutation();

  const { data: trendingMovies } = useQuery({
    queryKey: [apiManager.getTrendingMovies.key],
    queryFn: () => apiManager.getTrendingMovies.func(),
  });

  const handleToggleSearchBar = () => {
    setToggleSearchBar(!toggleSearchBar);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const fetchMovieSuggestions = useCallback(
    _.debounce(async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      try {
        setSuggestionsLoading(true);
        const response = await apiManager.searchMovies.func(query, i18n.language);
        setSuggestions(response.results);
      } catch (err) {
        toast("There was an error");
      } finally {
        setSuggestionsLoading(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    fetchMovieSuggestions.cancel();
    fetchMovieSuggestions(newSearchValue);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && /[a-zA-Z0-9]/.test(searchValue)) {
      setSearchValue("");
      setToggleSearchBar(!toggleSearchBar);
      navigate(`/search-results?query=${searchValue}`);
    } else if (e.key === "Escape") {
      setSearchValue("");
      setToggleSearchBar(!toggleSearchBar);
    }
  };

  useEffect(() => {
    return () => {
      fetchMovieSuggestions.cancel();
    };
  }, [fetchMovieSuggestions]);

  return {
    ui: {
      accentColor,
      isDrawerOpen,
      setIsDrawerOpen,
      toggleSearchBar,
      setToggleSearchBar,
      handleToggleSearchBar,
      inputRef,
    },
    auth: {
      deleteSessionMutation,
    },
    user: {
      isAuthenticated,
      sessionId,
      username,
    },
    movie: {
      suggestions,
      suggestionsLoading,
      trendingMovies,
    },
    t,
    i18n,
    searchValue,
    handleInputChange,
    handleEnterKeyPress,
  };
};

export default useNavbar;
