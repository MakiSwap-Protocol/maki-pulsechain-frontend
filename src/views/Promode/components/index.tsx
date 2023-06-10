import styled, { keyframes } from 'styled-components'
import { Card as MakiCard, Flex, CardBody, ArrowDownIcon, Button, IconButton, Text } from 'maki-toolkit'

export const SELL_COLOR = '#dc3545';
export const BUY_COLOR = '#28a745';

const Load = keyframes`{
  0% {
    opacity: 0%;
  }
  50% {
    opacity: 50%;
  }
  100% {
    opacity: 100%;
  }
}`

export const InputWrapper = styled.div`
  position: relative;
  & > p {
    position: absolute;
    top: 36px;
    left: 1rem;
    z-index: 2;
  }
  LimitCard & input {
    font-weight: bold;
  }
`

export const LimitContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
  }
`

export const LimitBody = styled(MakiCard)`
  min-width: 400px;
  position: relative;
  max-width: 436px;
  width: 100%;
  z-index: 5;
`
export const Clip = styled.div`
  width: 50px;
  padding: 5;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.3);
`
export const GridContainer = styled.div`
  min-height: calc(100vh - 74px);
  @media all and (max-width: 910px){
    display: block;
    & > div:nth-child(n) {
      margin-block: 2rem;
    } 
    & > div:first-child{
      margin-block: 0;
    }
  } 
  @media all and (min-width: 911px){
    display: grid;
    grid-template-columns: 30% 1fr 25%;
    grid-auto-rows: 6%;
    grid-gap: 10px;
    margin-bottom: 11rem;
  }
`

export const Container = styled.div`
  padding: 1rem;

`
export const StatusBarContent = styled(MakiCard)`
  min-height: 50px;
  max-height: 100px;
  height: 6%;
  border-radius: 5px;
  // display: flex;
  padding-inline: 10px;
  justify-content: space-around;
  grid-column-start: 1;
  grid-column-end: 3;
  display: subgrid;
  
`
export const CenterPanel = styled(MakiCard)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 100%;
  @media all and (min-width: 911px){
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 10;
  }

`
export const SidePanel = styled(MakiCard)`
  border-radius: 5px;
  height: 100%;
  @media all and (min-width: 911px){
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 18;
  }

`
export const LeftSidePanel = styled(MakiCard)`
  border-radius: 5px;
  height: 100%;
  @media all and (min-width: 911px){
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 18;
  }

`

export const OrderPainelContainer = styled(MakiCard)`
  border-radius: 5px;
  height: 100%;
  @media all and (min-width: 911px){
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 10;
    grid-row-end: 18;
  }

`

export const StyledNav = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`

export const ButtonNavItem = styled.a`
  color: #fcfcfc;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  flex: 1;
  &.active {
    font-weight: bold;
    border-bottom: solid 3px #6f95b1;
  }
  // &:hover{
  //   background-color: #6f95b1;
  // }
`

export const ButtonNavItemLabel = styled(Text)`
  padding: ${({ theme }) => theme.spacing[2]}px;
`

export const TextCenter = styled(Text)`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[4]}px;
  color: ${({ theme }) => theme.colors.textDisabled};
  font-weight: bold;
`

export const InputContainer = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
export const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`