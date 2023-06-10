import React, { FC, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Flex } from 'maki-toolkit'

import { NavProps } from 'components/CardNav'

import { StyledNav, ButtonNavItem, ButtonNavItemLabel } from '../components'


type OrderNavProps = NavProps

export const OrderNav: FC<OrderNavProps> = ({ activeIndex: defaultActiveIndex = 0, onChange }) => {
  const [activeIndex, setActive] = useState<number>(defaultActiveIndex)

  useEffect(() => onChange?.(activeIndex))

  return (
    <StyledNav>
      <ButtonNavItem id="order-book" className={activeIndex === 0 ? 'active' : undefined} onClick={() => setActive(0)}>
        <ButtonNavItemLabel>Market</ButtonNavItemLabel>
      </ButtonNavItem>
      <ButtonNavItem
        id="trade-history"
        className={activeIndex === 1 ? 'active' : undefined}
        onClick={() => setActive(1)}
      >
        <ButtonNavItemLabel>Limit</ButtonNavItemLabel>
      </ButtonNavItem>
      <ButtonNavItem
        id="trade-history"
        className={activeIndex === 2 ? 'active' : undefined}
        onClick={() => setActive(2)}
      >
        <ButtonNavItemLabel>Info</ButtonNavItemLabel>
      </ButtonNavItem>
    </StyledNav>
  )
}



