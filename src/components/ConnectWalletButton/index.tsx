import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { ButtonProps, ConnectorNames, useWalletModal } from 'maki-toolkit'
import { injected, walletconnect } from 'connectors'
import { GradientButton } from 'components/Buttons/GradientButton'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const { account, activate, deactivate } = useWeb3React()

  const handleLogin = (connectorId) => {
    if (connectorId === ConnectorNames.WalletConnect) {
      return activate(walletconnect)
    }
    return activate(injected)
  }

  const { onPresentConnectModal } = useWalletModal(handleLogin, deactivate, account as string)

  return (
    <GradientButton onClick={onPresentConnectModal} {...props}>
      Unlock Wallet
    </GradientButton>
  )
}

export default UnlockButton
