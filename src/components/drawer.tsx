import { Link } from "react-router-dom";
import useUserStore from "@/store/useUserStore";

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";

export const Drawer = ({
  isDrawerOpen,
  onDrawerToggle,
}: {
  isDrawerOpen: boolean;
  onDrawerToggle: () => void;
}) => {
  const { isAuthenticated } = useUserStore();

  return (
    <MuiDrawer
      variant="temporary"
      anchor="left"
      open={isDrawerOpen}
      onClose={onDrawerToggle}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onDrawerToggle}
        onKeyDown={onDrawerToggle}
      >
        <List>
          {[
            { name: "Movies", route: "/", icon: <MovieIcon /> },
            {
              name: "Upcoming",
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
      </Box>
    </MuiDrawer>
  );
};
