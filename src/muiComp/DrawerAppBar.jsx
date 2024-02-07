import * as React from "react";
import PropTypes from "prop-types";
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
import {
  Brightness4,
  Brightness7,
  Home,
  ShoppingBag,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Badge, styled, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const drawerWidth = 240;
// const navItems = ["Home", "Cart"];
const navItem = [
  {
    name: "Home",
    icon: <Home />,
    path: "/",
  },
  {
    name: "Cart",
    icon: <ShoppingBag />,
    path: "/Cart",
  },
];

function DrawerAppBar({ setMode }, props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ELINASHOP
      </Typography>
      <Divider />
      <List>
        {navItem.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
              {item.icon}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
    // @ts-ignore
    const { selectProducts } = useSelector((state) => state.counter);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            ELINASHOP
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Button
                onClick={() => {
                  navigate('/');
                }}
                sx={{ color: "#fff" }}
              >
                <Home/>
              </Button>
            <IconButton onClick={() => {
                  navigate('/Cart');
                }}>
              <StyledBadge badgeContent={selectProducts.length} color="secondary">
                <ShoppingCart />
              </StyledBadge>
            </IconButton>

            <Button>
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "currentMode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  setMode(theme.palette.mode === "light" ? "dark" : "light");
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7 sx={{ color: "orange" }} />
                ) : (
                  <Brightness4 sx={{ color: "white" }} />
                )}
              </IconButton>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
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
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
