import React from 'react'
import { useModal } from 'maki-toolkit'
import { useTranslation } from 'contexts/Localization'
import FaucetModal from './FaucetModal'
import { GradientButton } from './Buttons/GradientButton'

const FaucetButton = (props) => {
  const { t } = useTranslation()
  const [onPresentClaimModal] = useModal(<FaucetModal />)

  return (
    <GradientButton onClick={onPresentClaimModal} {...props}>
      {t('Claim PLS')}
    </GradientButton>
  )
}

export default FaucetButton
