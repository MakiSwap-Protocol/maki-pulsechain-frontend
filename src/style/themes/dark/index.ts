import { MakiTheme, dark } from 'maki-toolkit';

import { darkColors } from "./colors";
import { card } from "./card"

const defaultTheme: MakiTheme = {
  ...dark,
  isDark: true,
  colors: darkColors,
  nav: {
    ...dark.nav,
    background: darkColors.navBackground,
  },
  card,
}


export default defaultTheme;


