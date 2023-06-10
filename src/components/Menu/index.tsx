import React from 'react'
import { Menu as UikitMenu } from 'maki-toolkit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { useUsdPriceFromPid } from 'state/hooks' // Disabled until implemented: useProfile
import { MAKI_USD_POOL_PID } from 'config'
import config from './config'

// eslint-disable-next-line
const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const makiPriceUsd = useUsdPriceFromPid(MAKI_USD_POOL_PID) // MAKI-USD farm
  // const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      makiPriceUsd={makiPriceUsd.toNumber()}
      links={config(t)}
      // profile={{
      //    // username: profile?.username,
      //    // image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
      //    profileLink: '/profile',
      //    noProfileLink: '/profile',
      //    // showPip: !profile?.username,
      //  }}
      {...props}
    />
  )
}

export default Menu
