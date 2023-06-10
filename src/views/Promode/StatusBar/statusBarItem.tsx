import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import { IconButton, Text, Flex } from 'maki-toolkit'
import { HelpOutline } from 'components/Icons';

type StatusBarItemProps = {
    title: string;
    helpFunction: () => void | Promise<void>;
    // icon: string;
    // value: string;
}

const StatusBarItem: React.FC<StatusBarItemProps> = ({ 
  title,
  helpFunction,
  children
}) => {
  return (
    <Container>
      <Title onClick={helpFunction}>
        <Text color="textSubtle" fontSize="14px">
          { title }
        </Text>
        <HelpOutline height={14} width={14}/>
      </Title>
       { children }
    </Container>
  )
}

const Container = styled.div`
  
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`;

export default StatusBarItem;
