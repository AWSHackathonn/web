import React from 'react'
import { styled } from 'styled-components'
import RepoRadioButton from './RepoRadioButton'
import TextField from './TextField'

const InputQuestion = ({index}:{index:number}) => {
  return (
    <Container index={index}>
        <Header>
            <HeadText>자기소개서 문항{index+1}</HeadText>
            {index+1===1?<EssentialText>* 필수 항목</EssentialText>:<></>}
        </Header>
        <Input placeholder='자기소개서 문항을 입력해주세요.'/>
        <RepoRadioButton index={index}/>
        <TextField text="기타" isEssential={false} placeHolder='추가적으로 넣고 싶은 내용을 입력해주세요.' paddingLeftZeroOption={true}/>
    </Container>
  )
}

export default InputQuestion

const Container = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 20px 60px 10px;
  border-bottom: ${(props) => (props.index < 4 ? '1px solid #d9d9d9' : 'none')};
`;

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

const Input=styled.input`
     border-radius: 6px;
  border: 1px solid #d9d9d9;
  width:280px;
  height:40px;
  padding:10px;
`