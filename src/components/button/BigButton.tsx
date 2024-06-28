import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useRecoilState } from "recoil";
import { isOk } from "../../stores/input/atom";

interface BigButtonProps {
    text:string;
    event:()=>void;
    valid: boolean;
}


const BigButton = ({ text, event, valid }: BigButtonProps) => {
  return (
    <Button onClick={event} disabled={!valid} valid={valid}>
      {text}
    </Button>
  );
};

export default BigButton

const Button = styled.button<{ valid: boolean }>`
  width: 240px;
  height: 48px;
  border-radius: 8px;
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.textStyles.subtitle5.fontSize};
  background-color: ${(props) => (props.valid ? props.theme.lightblue : '#B4BCC6')};
  cursor: ${(props) => (props.valid ? 'pointer' : 'not-allowed')};
  
  &:hover {
    background-color: ${(props) => props.valid?props.theme.blue:'#b4bcc6'};
    transition: ${(props) => (props.valid ? '0.4s' : 'none')};
  }
`;