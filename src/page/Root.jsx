import { Box } from "@mui/material";
import Appbarr from "../muiComp/DrawerAppBar";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";
import getDesignTokens from "./Style/Mythemee";

const Root = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component={"main"}>
        <Appbarr setMode={setMode} />

        <Box mt={10}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Root;
