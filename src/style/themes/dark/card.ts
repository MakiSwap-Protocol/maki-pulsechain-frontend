import { MakiTheme, dark } from 'maki-toolkit';
import { CardTheme } from 'maki-toolkit/dist/components/Card/types';

import { darkColors } from "./colors"

export const card: CardTheme = {
  ...dark.card,
  background: darkColors.card,
  boxShadow: '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)', 
}