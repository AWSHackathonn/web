import React from 'react'
import styled from 'styled-components'

interface TextFieldProps {
    text:string;
    placeHolder:string;
    isEssential:boolean;
}

const TextField = ({text,placeHolder,isEssential}:TextFieldProps) => {
  return (
    <Container>
        <Header>
        <HeadText>{text}</HeadText>
        {isEssential?<EssentialText>* 필수 항목</EssentialText>:<></>}
        </Header>
        <Field placeholder={placeHolder}/>
    </Container>
  )
}

export default TextField

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap:15px;

    padding:10px;
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