import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from 'maki-toolkit'
import defaultTheme from '../style/themes/dark'

console.log('dark', dark.colors)
const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : true
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? defaultTheme : light}>{children}</SCThemeProvider>
      {/* <SCThemeProvider theme={defaultTheme}>{children}</SCThemeProvider> */}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
