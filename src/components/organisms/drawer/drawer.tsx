import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

import { languages } from "@/utils/constants";
import useDrawer from "@/hooks/useDrawer";

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import CheckIcon from "@mui/icons-material/Check";
import LoginIcon from "@mui/icons-material/Login";
import MovieIcon from "@mui/icons-material/Movie";
import LogoutIcon from "@mui/icons-material/Logout";
import tmdbLogo from "@/assets/tmdb-logo.svg";

export const Drawer = ({
  isDrawerOpen,
  onDrawerToggle,
}: {
  isDrawerOpen: boolean;
  onDrawerToggle: () => void;
}) => {
  const { i18n, t, isAuthenticated, sessionId, deleteSessionMutation } = useDrawer();

  return (
    <MuiDrawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={onDrawerToggle}>
      <img className="p-4" width="154" height="20" src={tmdbLogo} />

      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onDrawerToggle}
        onKeyDown={onDrawerToggle}
      >
        <List>
          {[
            { name: t("movies"), route: "/", icon: <MovieIcon /> },
            {
              name: t("upcoming"),
              route: "/upcoming",
              icon: <UpcomingIcon />,
            },
            !isAuthenticated
              ? { name: "Login", route: "/login", icon: <LoginIcon /> }
              : { name: "", route: "", icon: null },
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

        <Divider />

        <div className="flex flex-col gap-2 p-4 mb-6">
          <span className="font-semibold">{t("select_language")}</span>

          <div className="flex flex-col gap-4">
            {languages.map((l) => (
              <div
                key={l.name}
                onClick={() => i18n.changeLanguage(l.iso_639_1)}
                className="flex items-center gap-1 border rounded-md shadow-md p-4"
              >
                {i18n.language === l.iso_639_1 && (
                  <div className="flex justify-center items-center rounded-full h-[20px] w-[20px] border-2 bg-[#172554]">
                    <CheckIcon sx={{ color: "#fff", fontSize: 12 }} />
                  </div>
                )}

                <ReactCountryFlag countryCode={l.flag} />
                <span>{l.english_name}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {isAuthenticated && (
          <List>
            <ListItem onClick={() => deleteSessionMutation(sessionId)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={t("logout")} />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Box>
    </MuiDrawer>
  );
};
