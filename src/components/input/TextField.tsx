import React from 'react'
import styled from 'styled-components'

interface TextFieldProps {
    text:string;
    placeHolder:string;
    isEssential:boolean;
    paddingLeftZeroOption:boolean;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
    disabled?:boolean;
}

const TextField = ({text,placeHolder,isEssential, paddingLeftZeroOption, value, onChange, disabled}:TextFieldProps) => {
  return (
    <Container paddingLeftZeroOption={paddingLeftZeroOption}>
        <Header>
        <HeadText>{text}</HeadText>
        {isEssential?<EssentialText>* 필수 </EssentialText>:<></>}
        </Header>
        <Field placeholder={placeHolder} onChange={onChange} value={value} disabled={disabled}/>
    </Container>
  )
}

export default TextField

const Container = styled.div<{ paddingLeftZeroOption: boolean }>`
    display: flex;
    flex-direction: column;
    gap:15px;

    padding:10px;
    padding-left: ${(props)=>props.paddingLeftZeroOption?'0px':'10px'};
`

const Header=styled.div`
    display:flex;
    gap:5px;
    align-items: center;
`

const HeadText= styled.p`
    font-size:${(props)=>props.theme.textStyles.subtitle5.fontSize};
    font-weight: bold;
`

const EssentialText=styled.p`
    color:${(props)=>props.theme.error};
    font-size:${(props)=>props.theme.textStyles.caption.fontSize};
`

const Field=styled.textarea`
    width:520px;
    height:120px;

    resize:none;

    border-radius: 6px;
    border-color: #d9d9d9;

    padding:10px;
`