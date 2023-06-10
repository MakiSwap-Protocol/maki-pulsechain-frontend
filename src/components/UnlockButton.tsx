import React from 'react'
import { useWalletModal } from 'maki-toolkit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { GradientButton } from './Buttons/GradientButton'


const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <GradientButton onClick={onPresentConnectModal} {...props}>
      {t('Unlock Wallet')}
    </GradientButton>
  )
}

export default UnlockButton
