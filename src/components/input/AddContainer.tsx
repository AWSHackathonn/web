import React from 'react'
import { FiPlus } from 'react-icons/fi'
import styled from 'styled-components'

const AddContainer = ({text, event}:{text:string, event:()=>void}) => {
  return (
    <Container onClick={event}>
        <Text>{text}</Text>
        <PlusIcon />
    </Container>
  )
}

export default AddContainer

const Container=styled.div`
    display: flex;
    gap:2px;
    align-items: center;
    justify-content: center;

    &:hover{
        color: ${(props)=>props.theme.blue};

        transition:0.4s;
    }

    cursor: pointer;
`

const Text=styled.p`
    font-size:${(props)=>props.theme.textStyles.subtitle5.fontSize};
    
`

const PlusIcon = styled(FiPlus)`
    font-size:${(props)=>props.theme.textStyles.subtitle5.fontSize};
`