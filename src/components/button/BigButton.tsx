import React from 'react'
import styled from 'styled-components';

interface BigButtonProps {
    text:string;
    event:()=>void;
}


const BigButton = ({text, event}:BigButtonProps) => {
  return (
    <Button onClick={()=>{event();}}>{text}</Button>
  )
}

export default BigButton

const Button = styled.button`
    width:240px;
    height:48px;

    border-radius: 8px;

    color: ${(props)=>props.theme.white};
    font-size:${(props)=>props.theme.textStyles.subtitle5.fontSize};

    background-color: #B4BCC6;
    
    &:hover{
        background-color:${(props)=>props.theme.blue} ;

        transition:0.4s
    }
`