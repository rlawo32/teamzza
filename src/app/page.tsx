import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme/theme";
import { GlobalStyle } from "./theme/global";

import useShuffleBaseStore from "./stores/useShuffleBaseStore";

import Main from "./views/main";

export default function Home() {

  const {themeMode} = useShuffleBaseStore();
  
  return (
    <ThemeProvider theme={themeMode ? darkTheme : lightTheme } >
      <GlobalStyle />
      <div>
        <Main />
      </div>
    </ThemeProvider>
  );
}
