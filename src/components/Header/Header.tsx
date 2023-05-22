import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BoxStyled } from "./styles";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "routes/constants";
import { CSSTransition } from "react-transition-group";

import "./styles.css";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { id: 1, name: "HOME", path: ROUTES.HOME },
  { id: 2, name: "POPULAR", path: ROUTES.POPULAR },
  { id: 3, name: "TOP RATED", path: ROUTES.TOP_RATED },
  { id: 4, name: "NOW PLAYING", path: ROUTES.NOW_PLAYING },
  { id: 5, name: "MY FAVORITES", path: ROUTES.MY_FAVORITES },
];

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MOVIES DB 3000
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.path} selected={location.pathname === item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <BoxStyled>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{backgroundColor:"white"}}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white", backgroundColor:"green"}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
                fontWeight: 700,
                color: "black",
                fontSize: "40px",
                padding: "30px 0px 30px 30px",
              },
            }}
          >
            MOVIES DB 3000
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                style={{ textDecorationLine: "none" }}
              >
                <Button
                  sx={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: location.pathname === item.path ? "orange" : "black",
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade-enter"
      >
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </CSSTransition>
    </BoxStyled>
  );
}
