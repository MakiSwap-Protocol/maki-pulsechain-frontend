import React, { useEffect, useMemo, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from 'hooks'
import { useAllTokens } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import { useDerivedSwapInfo, useSwapActionHandlers } from 'state/swap/hooks'
import { useTranslation } from 'contexts/Localization'
import { EOrderType } from 'state/limit/enums'
import { usePairOrders } from 'state/limit/hooks'
import { TableText } from './tableText'
import RightPanelNav from './rightPanelNav'
import { Table, TableData } from '../tables/table'
import { TextCenter } from '../components'

const Container = styled.aside`
  display: flex;
  flex-direction: column;
`
// const Table = styled.table`
//   margin-top: 15px;
//   font-size: 0.8rem;
//   border-collapse: separate;
//   border-spacing: 0 8px;
// `;
// const Tr = styled.tr `
//   // padding-inline: 10px;
//   &.active{
//     background-color: rgba(255,255,255,0.4);
//   }
// `
// const Td = styled.td`
//   text-align: center;
//   vertical-align: middle;
//   padding: 10px;
// `
// const TrHeader = styled.tr`
//   // padding-inline: 10px;
// `;

const Diviser = styled.div`
  // padding: ${({ theme }) => theme.spacing[1]}px;
  border: 1px solid ${({ theme }) => theme.colors.backgroundDisabled};
`
// const TableHeader: React.FC<unknown> = () => {
//   return(
//     <thead>
//       <TrHeader>
//         <th scope="col">Price in WPLS</th>
//         <th scope="col">Amount</th>
//         <th scope="col">Total PLS</th>
//       </TrHeader>
//     </thead>
//   )
// }

interface RightPanelDataTable extends TableData {
  amount: string | number
  price: string | number
  total: string | number
  type: EOrderType
}

export default function () {
  const { t } = useTranslation()
  const [panelIndex, setPanelIndex] = useState<number>(0)
  const { currencies } = useDerivedSwapInfo()
  const pairOrders = usePairOrders()

  const dataSell: RightPanelDataTable[] = useMemo(() => {
    return pairOrders
      .filter((p) => p.type === EOrderType.SELL)
      .map((p) => ({
        amount: p.tokenOutAmount.toFixed(8),
        price: `${p.price.toFixed(8)}`,
        total: p.tokenInAmount.toFixed(8),
        type: p.type,
      }))
  }, [pairOrders])

  const dataBuy: RightPanelDataTable[] = useMemo(() => {
    return pairOrders
      .filter((p) => p.type === EOrderType.BUY)
      .map((p) => ({
        amount: p.tokenOutAmount.toFixed(8),
        price: `${p.price.toFixed(8)}`,
        total: p.tokenInAmount.toFixed(8),
        type: p.type,
      }))
  }, [pairOrders])

  // console.log('dataSell', pairOrders);

  const columns = useMemo(
    () => [
      {
        Header: t('Amount'),
        accessor: 'amount',
        Cell: ({ value, row }) => {
          return <TableText type={row.original.type}>{value}</TableText>
        },
      },
      {
        Header: t('Price'),
        accessor: 'price',
        Cell: ({ value, row }) => {
          return <TableText type={row.original.type}>{value}</TableText>
        },
      },
      {
        Header: `${t('Total')} ${currencies[Field.OUTPUT]?.symbol ?? 'MAKI'}`,
        accessor: 'total',
        Cell: ({ value, row }) => {
          return <TableText type={row.original.type}>{value}</TableText>
        },
      },
    ],
    [t, currencies],
  )
  const Content = useMemo(() => {
    if (panelIndex === 0) {
      return (
        <>
          <Table
            id="pairs-table-sell"
            columns={columns}
            noContent={<TextCenter small>{t('There are not buy orders for this pair')}</TextCenter>}
            data={dataSell}
          />
          <Diviser />
          <Table
            id="pairs-table-buy"
            columns={columns}
            hiddenHead
            noContent={<TextCenter small>{t('There are not sell orders for this pair')}</TextCenter>}
            data={dataBuy}
          />
        </>
      )
    }
    return <></>
  }, [panelIndex, columns, dataBuy, dataSell, t])

  return (
    <Container>
      <RightPanelNav activeIndex={panelIndex} onChange={(index) => setPanelIndex(index)} />
      {Content}
    </Container>
  )
}
