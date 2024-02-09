import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import ReactCountryFlag from "react-country-flag";

import { deleteSession } from "@/api";
import { languages } from "@/utils/constants";
import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";
import { Drawer } from "@/components/organisms";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import tmdbLogo from "@/assets/tmdb-logo.svg";

export const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { resetMovieStatus } = useMovieStore();
  const { resetState, isAuthenticated, sessionId, username, accentColor } =
    useUserStore();

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [toggleSearchBar, setToggleSearchBar] = React.useState<boolean>(false);

  const { mutateAsync: deleteSessionMutation } = useMutation({
    mutationFn: (payload: string) => deleteSession(payload),
    onSuccess: () => {
      resetState();
      resetMovieStatus();
      localStorage.clear();
    },
  });

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue !== "") {
      setSearchValue("");
      setToggleSearchBar(!toggleSearchBar);
      navigate(`/search-results?query=${searchValue}`);
    }
  };

  return (
    <>
      <div className="bg-[#172554] px-4 md:px-8 py-5 text-white flex items-center justify-between">
        <div className="flex flex-row-reverse md:flex-row items-center gap-4">
          <img width="154" height="20" src={tmdbLogo} />

          {/* hide in mobile view  */}
          <div className="hidden md:flex gap-4">
            <Link to="/">
              <span>{t("movies")}</span>
            </Link>
            <Link to="/upcoming">
              <span>{t("upcoming")}</span>
            </Link>
          </div>

          {/* show in mobile view  */}
          <div className="flex md:hidden">
            <MenuIcon onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
            <Drawer
              isDrawerOpen={isDrawerOpen}
              onDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)}
            />
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {/** hide in mobile view */}
          <div className="hidden md:flex">
            <Menu as="div" className="relative z-[100]">
              <Menu.Button className="border px-[6px] py-[3px] text-sm rounded-sm cursor-pointer hover:bg-white hover:text-black ease-in duration-300">
                {i18n.language.toUpperCase()}
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute mt-2 p-2 bg-white w-44 text-black rounded-md shadow-xl">
                  <div className="font-semibold p-2">
                    {t("select_language")}
                  </div>

                  <div className="flex flex-col gap-2 p-">
                    {languages.map((l) => (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => i18n.changeLanguage(l.iso_639_1)}
                            className={`flex gap-2 items-center cursor-pointer rounded-md py-1 px-2 ${
                              active ? "bg-[#172554] text-white" : "text-black"
                            }`}
                          >
                            <ReactCountryFlag countryCode={l.flag} />
                            <span>{l.english_name}</span>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <SearchIcon
            sx={{ cursor: "pointer", color: "#729ded", fontSize: 30 }}
            onClick={() => setToggleSearchBar(!toggleSearchBar)}
          />

          {!isAuthenticated ? (
            <Link to="/login">
              <span>{t("login")}</span>
            </Link>
          ) : (
            <div className="flex gap-6 items-center">
              <Link
                to="/profile"
                style={{ background: accentColor }}
                className="cursor-pointer flex items-center justify-center text-xl rounded-full w-[12px] h-[12px] p-4"
              >
                {username.slice(0, 1).toUpperCase()}
              </Link>

              <span
                className="hidden md:block cursor-pointer"
                onClick={() => deleteSessionMutation(sessionId)}
              >
                {t("logout")}
              </span>
            </div>
          )}
        </div>
      </div>

      {toggleSearchBar && (
        <div className="relative">
          <input
            className="py-2 px-12 border-2 rounded-sm placeholder:italic text-[20px] focus:outline-none w-full"
            value={searchValue}
            onKeyDown={handleEnterKeyPress}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("search_movie_placeholder")}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <SearchIcon />
          </div>

          <div className="cursor-pointer text-gray-500 absolute right-3 top-1/2 -translate-y-1/2">
            <CloseIcon onClick={() => setToggleSearchBar(!toggleSearchBar)} />
          </div>
        </div>
      )}
    </>
  );
};
