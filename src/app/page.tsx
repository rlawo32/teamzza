'use client'

import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import { GlobalStyle } from "./theme/global";

import useShuffleBaseStore from "./stores/useShuffleBaseStore";
import RollbackBox from "./views/rollbackBox";
import DarkmodeBox from "./views/darkmodeBox";

import Main from "./views/main";

export default function Home() {

  const { themeMode } = useShuffleBaseStore();
  
  return (
    <ThemeProvider theme={themeMode ? darkTheme : lightTheme } >
      <GlobalStyle />
      <DarkmodeBox />
      <RollbackBox />
      <div>
        <Main />
      </div>
    </ThemeProvider>
  );
}
