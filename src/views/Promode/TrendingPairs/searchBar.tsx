import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'maki-toolkit'
import { Currency, Token } from 'maki-pulsechain-sdk'

import SearchInput from 'components/SearchInput'
import Row from 'components/Layout/Row'
import CurrencySearch from 'components/SearchModal/CurrencySearch'

import { useTranslation } from 'contexts/Localization'
import { useSwapActionHandlers, useDerivedSwapInfo } from 'state/swap/hooks'
import useDebounce from 'hooks/useDebounce'
import { Field } from 'state/swap/actions'

type SearchBarProps = {

}

export const SearchBar: React.FC<SearchBarProps> = () => {
  const { t } = useTranslation()
    // used for import token flow
    const [importToken, setImportToken] = useState<Token | undefined>()
    const { onCurrencySelection } = useSwapActionHandlers()
    const { currencies, inputError: swapInputError } = useDerivedSwapInfo()
    const selectedCurrency = currencies[Field.OUTPUT]?.symbol === process.env.REACT_APP_DEFAULT_CURRENCY ?
    {
      ...currencies[Field.OUTPUT],
      symbol: process.env.REACT_APP_DEFAULT_TOKEN,
    }: currencies[Field.OUTPUT];
    const otherSelectedCurrency = currencies[Field.INPUT]?.symbol === process.env.REACT_APP_DEFAULT_CURRENCY ?
    {
      ...currencies[Field.INPUT],
      symbol: process.env.REACT_APP_DEFAULT_TOKEN,
    } : currencies[Field.INPUT];
  return (
    <Flex padding={20} width="100%">
      <CurrencySearch 
      showCommonBases={false}
      onCurrencySelect={(currency) => onCurrencySelection(Field.OUTPUT, currency)}
      setImportToken={setImportToken}
      selectedCurrency={selectedCurrency}
      otherSelectedCurrency={otherSelectedCurrency}
      showImportView={() => console.log('showImportView')}
      />
    </Flex>
  )
}

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`
