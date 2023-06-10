import React, { FC } from 'react'
import styled from 'styled-components'
import { Text } from 'maki-toolkit'

type StatusBarItemContentProps = {
  iconRender: JSX.Element;
}

export const StatusBarItemContent: FC<StatusBarItemContentProps> = ({
  iconRender,
  children
}) => {
  return(
    <Container>
      { iconRender }
      <Text fontSize="12px">
        {children}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`