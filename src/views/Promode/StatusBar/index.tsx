import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Layers, ArrowUp, ArrowDown } from 'react-feather'

import { IToken } from 'state/limit/types/token.interface'
import { IPair } from 'state/limit/types/pair.interface'
import { AttachMoney } from 'components/Icons';
import useTheme from 'hooks/useTheme'
import StatusBarItem from './statusBarItem'
import { StatusBarItemContent } from './statusBarItemContent'

type StatusBarProps = {
  pair?: IPair;
  price: number;
  volume: number;
  totalLiquidity: number;
  high: number;
  low: number;
}

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export default function ({
  high,
  low,
  pair,
  price,
  totalLiquidity,
  volume
}: StatusBarProps) {
  const { theme }  = useTheme()
  return (
    <>
      <StatusBarItem title='Price' helpFunction={() => console.log('aqui')}>
        <StatusBarItemContent iconRender={<AttachMoney height={12} width={12} color='#28a745'/>}>
          {price}
        </StatusBarItemContent>
      </StatusBarItem>
      <StatusBarItem title='Volume (24hrs)' helpFunction={() => console.log('aqui')}>
        <StatusBarItemContent iconRender={<Layers color='#B983FF'height={12} width={12}/>}>
          { totalLiquidity }
        </StatusBarItemContent>
      </StatusBarItem>
      <StatusBarItem title='Total Liquidity' helpFunction={() => console.log('aqui')}>
        <StatusBarItemContent iconRender={<Layers color='yellow'height={12} width={12}/>}>
          { totalLiquidity }
        </StatusBarItemContent>
      </StatusBarItem>
      <StatusBarItem title='High (24hrs)' helpFunction={() => console.log('aqui')}>
        <StatusBarItemContent iconRender={<ArrowUp color='#28a745' height={12} width={12}/>}>
          { high }
        </StatusBarItemContent>
      </StatusBarItem>
      <StatusBarItem title='Low (24hrs)' helpFunction={() => console.log('aqui')}>
        <StatusBarItemContent iconRender={<ArrowDown color={theme.colors.failure} height={12} width={12}/>}>
          { low }
        </StatusBarItemContent>
      </StatusBarItem>
    </>
  )
}
