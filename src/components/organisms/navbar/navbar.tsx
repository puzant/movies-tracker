import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import ReactCountryFlag from "react-country-flag";

import { languages } from "@/utils/constants";
import useNavbar from "@/hooks/useNavbar";
import { IMovie } from "@/interfaces";

import { Drawer } from "@/components/organisms";

import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import LinearProgress from "@mui/material/LinearProgress";

import tmdbLogo from "@/assets/tmdb-logo-1.svg";

export const Navbar = () => {
  const { ui, auth, user, movie, t, i18n, searchValue, handleInputChange, handleEnterKeyPress } = useNavbar();

  const RenderMovieTitle = ({ movie }: { movie: IMovie }) => (
    <Link to={`/movie/${movie.id}`} onClick={() => ui.setToggleSearchBar(!ui.toggleSearchBar)}>
      <div className="text-sm border border-stone-200 px-10 py-1 hover:bg-stone-100 cursor-pointer transition duration-100 ease-in-out">
        <MovieCreationOutlinedIcon sx={{ fontSize: 18 }} /> {movie.title}
      </div>
    </Link>
  );

  return (
    <>
      <div className="bg-[#172554] px-4 lg:px-8 py-5 text-white flex items-center justify-between">
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
            <MenuIcon onClick={() => ui.setIsDrawerOpen(!ui.isDrawerOpen)} />
            <Drawer isDrawerOpen={ui.isDrawerOpen} onDrawerToggle={() => ui.setIsDrawerOpen(!ui.isDrawerOpen)} />
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
                  <div className="font-semibold p-2">{t("select_language")}</div>

                  <div className="flex flex-col gap-2 p-">
                    {languages.map((l) => (
                      <Menu.Item key={l.name}>
                        {({ active }) => (
                          <div
                            data-testid={`test-${l.iso_639_1}`}
                            onClick={() => i18n.changeLanguage(l.iso_639_1)}
                            className={`flex gap-2 items-center cursor-pointer rounded-md py-1 px-2 ${
                              active ? "bg-[#172554] text-white" : "text-black"
                            }`}
                          >
                            <ReactCountryFlag countryCode={l.flag} />
                            <span>{t(l.english_name.toLowerCase())}</span>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <SearchIcon sx={{ cursor: "pointer", color: "#729ded", fontSize: 30 }} onClick={ui.handleToggleSearchBar} />

          {!user.isAuthenticated ? (
            <Link to="/login">
              <span>{t("login")}</span>
            </Link>
          ) : (
            <div className="flex gap-6 items-center">
              <Link
                to="/profile"
                style={{ background: ui.accentColor }}
                className="cursor-pointer flex items-center justify-center text-xl rounded-full w-[12px] h-[12px] p-4"
              >
                {user.username.slice(0, 1).toUpperCase()}
              </Link>

              <span
                className="hidden md:block cursor-pointer"
                onClick={() => auth.deleteSessionMutation(user.sessionId)}
              >
                {t("logout")}
              </span>
            </div>
          )}
        </div>
      </div>

      {ui.toggleSearchBar && (
        <div className="relative">
          <div className="relative">
            <input
              className="py-2 px-10 border-2 rounded-sm placeholder:italic text-[15px] md:text-[18px] focus:outline-none w-full"
              value={searchValue}
              ref={ui.inputRef}
              onKeyDown={handleEnterKeyPress}
              onChange={handleInputChange}
              placeholder={t("search_movie_placeholder")}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon />
            </div>

            <div className="cursor-pointer text-gray-500 absolute right-3 top-1/2 -translate-y-1/2">
              <CloseIcon onClick={() => ui.setToggleSearchBar(!ui.toggleSearchBar)} />
            </div>
          </div>

          {movie.suggestionsLoading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}

          <div className="absolute left-0 right-0 bg-white z-50">
            {!movie.suggestions.length && (
              <h2 className="bg-stone-100 font-bold px-10 py-2">
                <TrendingUpIcon sx={{ fontSize: 22 }} /> {t("trending")}
              </h2>
            )}

            {!movie.suggestions.length &&
              movie.trendingMovies?.results.slice(0, 8).map((movie: IMovie) => <RenderMovieTitle movie={movie} />)}

            {!movie.suggestionsLoading &&
              movie.suggestions.slice(0, 10).map((movie: IMovie) => <RenderMovieTitle movie={movie} />)}
          </div>
        </div>
      )}
    </>
  );
};
