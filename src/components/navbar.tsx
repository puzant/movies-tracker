import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useUserStore from "@/store/useUserStore";
import useMovieStore from "@/store/useMovieStore";
import { deleteSession } from "@/api";

import MenuIcon from "@mui/icons-material/Menu";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";
import tmdbLogo from "@/assets/tmdb-logo.svg";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

export const Navbar = () => {
  const navigate = useNavigate();
  const { resetState, isAuthenticated, sessionId } = useUserStore();
  const { resetMovieStatus } = useMovieStore();

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

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

      <div
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="flex justify-between w-full sm:hidden"
      >
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

      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          onKeyDown={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <List>
            {[
              { name: "Movies", route: "/", icon: <MovieIcon /> },
              { name: "Upcoming", route: "/upcoming", icon: <UpcomingIcon /> },
              isAuthenticated
                ? { name: "Logout", route: "", icon: <LogoutIcon /> }
                : { name: "Login", route: "/login", icon: <LoginIcon /> },
            ].map((nav) => (
              <Link key={nav.name} to={nav.route}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{nav.icon}</ListItemIcon>
                    <ListItemText primary={nav.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
