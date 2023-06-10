import React, { useMemo } from 'react'
import { IconButton, Text, Flex } from 'maki-toolkit'
import { Token, Pair, PLS } from 'maki-pulsechain-sdk'
import { floatNumber } from 'utils/number'
import { useTranslation } from 'contexts/Localization'
import { useAllTokens, useDefaultTokens } from 'hooks/Tokens'
import { useTradeExactOut, useTradeExactIn, useTrades } from 'hooks/Trades'
import { tryParseAmount } from 'state/swap/hooks'
import { Table, TableData } from '../tables/table'

type PairTableProps = {

}

export function PairTable(props: PairTableProps) {
  const { t } = useTranslation()

  const trades = useTrades(PLS)
  const data:TableData[]  = useMemo(() => {
    return trades.map( p => ({
      pair: `${p.inputAmount.currency?.symbol}`,
      lastPrice: `${p.executionPrice.toSignificant(8)} ${PLS.symbol}`,
      change: ` - %`,
      volume: '$ - '
    }))
  }, [trades])

  const columns = useMemo(() => [
    {
      Header: t('Pairs'),
      accessor: 'pair',
      Cell: ({ value, row }) => {
        return (
          <Text color="textSubtle" small>{value}</Text>
        )
      }
    },
    {
      Header: t('Last Price'),
      accessor: 'lastPrice',
      Cell: ({ value, row }) => {
        return (
          <Text color="textSubtle" small>{value}</Text>
        )
      }
    },
    {
      Header: t('Change'),
      accessor: 'change',
      Cell: ({ value }) => {
        // const isPositive: boolean = floatNumber(value) > 0 
        const isPositive = true
        return (
          <Text color={isPositive ? '#28a745' : '#dc3545'} small>{value}</Text>
        )
      }
    },
    {
      Header: t('Volume'),
      accessor: 'volume',
      Cell: ({ value, row }) => {
        return (
          <Text color="textSubtle" small>{value}</Text>
        )
      }
    }
  ], [t])

  return (
    <Flex>
      <Table
      id='pairs-table'
      columns={columns}
      data={data}
      initialState={{
        pageSize: 35
      }}
      />

    </Flex>
  )
}
