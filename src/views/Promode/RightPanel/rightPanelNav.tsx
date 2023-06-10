import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex } from 'maki-toolkit'

import { Nav, NavProps } from 'components/CardNav'
import { ButtonNavItem, ButtonNavItemLabel } from '../components'

const RightNav = styled(Flex)`

`

type TableNavProps = NavProps
const RightPanelNav: FC<TableNavProps> = ({ activeIndex: defaultActiveIndex = 0, onChange }) => {
  
  const[activeIndex, setActive] = useState<number>(defaultActiveIndex);

  useEffect(() => onChange?.(activeIndex))

  return (
    <RightNav>
      <ButtonNavItem 
        id="order-book" 
        className={activeIndex === 0 ? 'active' : undefined}
        onClick={() => setActive(0)}
      >
        <ButtonNavItemLabel>Order Book</ButtonNavItemLabel>
      </ButtonNavItem>
      {/* <ButtonNavItem id="trade-history"
      className={activeIndex === 1 ? 'active' : undefined}
      onClick={() => setActive(1)}>

        <ButtonNavItemLabel>Trade History </ButtonNavItemLabel>
      </ButtonNavItem> */}
    </RightNav>
  )         
}

export default RightPanelNav