import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { deleteSession } from "@/api";
import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";

import tmdbLogo from "@/assets/tmdb-logo.svg";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const { resetState, isAuthenticated, sessionId } = useUserStore();
  const { resetMovieStatus } = useMovieStore();

  const [searchValue, setSearchValue] = React.useState("");

  const { mutateAsync: deleteSessionMutation } = useMutation({
    mutationFn: (payload) => deleteSession(payload),
    onSuccess: () => {
      resetState();
      resetMovieStatus();
      localStorage.clear();
    },
  });

  return (
    <div className="bg-[#172554] p-4 text-white flex items-center justify-between">
      <div className="hidden sm:flex gap-5">
        <img width="154" height="20" src={tmdbLogo} />
        <Link to="/">
          <span>Movies</span>
        </Link>
        <Link to="/upcoming">
          <span>Upcoming</span>
        </Link>
      </div>

      <div className="flex justify-between w-full sm:hidden">
        <MenuIcon />
        <img width="154" height="20" src={tmdbLogo} />
      </div>

      <div className="hidden sm:flex gap-5 items-center">
        <div className="flex gap-2">
          <input
            className="px-3 py-2 bg-gray-500/50 rounded-sm px-4 placeholder:text-white focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
          />

          <button
            disabled={!searchValue.length}
            onClick={() => navigate(`/search-results?query=${searchValue}`)}
            className="bg-blue-400 px-3.5 py-1.5 cursor-pointer rounded-md text-white"
          >
            Search
          </button>
        </div>

        {!isAuthenticated ? (
          <Link to="/login">
            <span>Login</span>
          </Link>
        ) : (
          <span
            className="cursor-pointer"
            onClick={() => deleteSessionMutation(sessionId)}
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
};
