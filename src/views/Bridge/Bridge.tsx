import React, { useState, useCallback } from 'react'
import { Token } from 'maki-pulsechain-sdk'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, ArrowDownIcon, CardBody, Button, Text as UIKitText } from 'maki-toolkit'

import { BASE_CHAIN_ID } from 'config'
import tokens from 'config/constants/tokens'

import { useActiveWeb3React } from 'hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'


import { useTranslation } from 'contexts/Localization'
import { useIsExpertMode } from 'state/user/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { tryParseAmount } from 'state/swap/hooks'
import { useCurrencyBalances } from 'state/wallet/hooks'

import AppBody from 'components/AppBody'
import ConnectWalletButton from 'components/ConnectWalletButton'
import PageHeader from 'components/ExchangePageHeader'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/TransactionConfirmationModal'
import { AutoColumn, ColumnCenter } from 'components/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { getBridgeSenderAddress, getMakiAddress } from 'utils/configHelpers'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { RowBetween } from 'components/Row'


import { Dots, Wrapper } from 'views/Pool/styleds'

import { calculateGasMargin, getBridgeSenderContract } from 'utils'
import ConfirmBridgeModalBottom from './ConfirmBridgeModalBottom'



const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/maki-bg1.svg'), url('/images/maki-bg2.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const BridgePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  min-height: calc(100vh - 64px);
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const Actions = styled.div`
  margin-top: 24px;
`

const Bridge: React.FC = () => {

  const makiToken = new Token(
    BASE_CHAIN_ID,
    tokens.maki.address[BASE_CHAIN_ID],
    tokens.maki.decimals,
    tokens.maki.symbol,
    tokens.maki.name
  )

  const { t } = useTranslation()
  
  const { account, chainId, library } = useActiveWeb3React()

  const balance = useCurrencyBalances(account ?? undefined, [makiToken])[0]

  const expertMode = useIsExpertMode()

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const [amount, setAmount] = useState('0')

  // parsed Amount
  const parsedAmount = tryParseAmount(amount, makiToken);

  // check whether the user has approved the router on the tokens
  const [approval, approveCallback] = useApproveCallback(
    parsedAmount,
    getBridgeSenderAddress()
  )

  const addTransaction = useTransactionAdder()

  const modalHeader = () => {
    return (<></>)
    // return (
    //   <AutoColumn gap="20px">
    //     <LightCard mt="20px" borderRadius="20px">
    //       <RowFlat>
    //         <UIKitText fontSize="48px" mr="8px">
    //           {`${makiToken.symbol}`}
    //         </UIKitText>

    //         <CurrencyLogo currency={makiToken} size={'30px'} />
    //       </RowFlat>
    //     </LightCard>
    //   </AutoColumn>
    // )
  }

  const modalBottom = () => {
    return (
      <ConfirmBridgeModalBottom
        currency={makiToken}
        parsedAmount={parsedAmount}
        onBridge={onBridge}
      />
    )
  }

  const pendingText = `Bridging ${parsedAmount?.toSignificant(6)} ${makiToken?.symbol} to Polygon`

  async function onBridge() {
    if (!chainId || !library || !account) return

    const bridgeSenderContract = getBridgeSenderContract(chainId, library, account);

    const estimate = bridgeSenderContract.estimateGas.swap

    const method: (...args: any) => Promise<TransactionResponse> = bridgeSenderContract.swap

    const args: Array<string | string[] | number> = [
      parsedAmount.raw.toString()
    ]

    const value: BigNumber | null = BigNumber.from('0')
    
    setAttemptingTxn(true)

    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) => 
        method(...args, { ...(value ? { value } : {}), gasLimit: calculateGasMargin(estimatedGasLimit), }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Bridge ${parsedAmount?.toSignificant(3)} ${makiToken?.symbol} from Pls to Polygon`,
          })

          setTxHash(response.hash)
        }),
      )
      .catch((e) => {
        setAttemptingTxn(false)
        
        // we only care if the error is something _other_ than the user rejected the tx
        if (e?.code !== 4001) {
          console.error(e)
        }
      })
  }

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      setAmount('')
    }
    setTxHash('')
  }, [txHash])

  const handleMaxInput = useCallback(() => { setAmount(balance.toExact() ?? '') }, [balance])

  return (
    <BridgePage>
      {/* modal */}

      <AppBody>
        
        <PageHeader 
          title="Bridge"
          description="Bridge tokens in an instant"
          showSettings={false}
        /> 

        <Wrapper>
          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            content={() => (
              <ConfirmationModalContent
                title="You will bridge"
                onDismiss={handleDismissConfirmation}
                topContent={modalHeader}
                bottomContent={modalBottom}
              />
            )}
            pendingText={pendingText}
          />
          <CardBody>
            <AutoColumn gap="20px">
              <CurrencyInputPanel
                label="From (Pls)"
                value={amount}
                currency={makiToken}
                onUserInput={setAmount}
                onMax={handleMaxInput}
                showMaxButton
                disableCurrencySelect
                id="bridge-from-input"
              />

              <ColumnCenter style={{ padding: '0 1.4rem' }}>
                <ArrowDownIcon color="primary" width="24px" />
              </ColumnCenter>

              <CurrencyInputPanel
                label="To (Polygon)"
                value={amount}
                currency={makiToken}
                onUserInput={setAmount}
                onMax={handleMaxInput}
                showMaxButton={false}
                showCommonBases={false}
                hideBalance
                disableCurrencySelect
                disabled
                id="bridge-to-input"
              />

              {!account ? (
                <ConnectWalletButton width="100%" />
              ) : (
                <AutoColumn gap="md">
                  {(approval === ApprovalState.NOT_APPROVED ||
                    approval === ApprovalState.PENDING) && 
                    (
                      // approval !== ApprovalState.APPROVED && (
                        <RowBetween>
                          <Button
                            onClick={approveCallback}
                            disabled={approval === ApprovalState.PENDING}
                            style={{ width: '100%' }}
                          >
                            {approval === ApprovalState.PENDING ? (
                              <Dots>Approving {makiToken?.symbol}</Dots>
                            ) : (
                              `Approve ${makiToken?.symbol}`
                            )}
                          </Button>
                        </RowBetween>
                      // )
                    )}
                  <Button
                    onClick={() => {
                      if (expertMode) {
                        onBridge()
                      } else {
                        setShowConfirm(true)
                      }
                    }}
                    disabled={approval !== ApprovalState.APPROVED || amount === '0'}
                    variant="primary"
                    width="100%"
                  >
                    Bridge
                  </Button>
                </AutoColumn>
              )}
            </AutoColumn>
          </CardBody>

        </Wrapper>
      </AppBody>

    </BridgePage>

  );
};

export default Bridge
