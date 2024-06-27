import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ReadmeRadioButton from './ReadmeRadioButton'
import TextField from './TextField'
import { useRecoilState } from 'recoil'
import { userInputAtom } from '../../stores/input/atom'

const InputQuestion = ({index}:{index:number}) => {
  const [inputValue, setInputValue] = useState('');
  const [userInput, setUserInput]=useRecoilState(userInputAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestionList = [...userInput.questionList];
    updatedQuestionList[index] = {
      ...updatedQuestionList[index],
      question: event.target.value, // inputValue를 question에 할당
    };
  
    setUserInput((prevState) => ({
      ...prevState,
      questionList: updatedQuestionList,
    }));
  
    setInputValue(event.target.value); // inputValue 상태 업데이트
  };

  const handleOtherDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuestionList = [...userInput.questionList];
    updatedQuestionList[index] = {
      ...updatedQuestionList[index],
      otherData: event.target.value,
    };

    setUserInput((prevState) => ({
      ...prevState,
      questionList: updatedQuestionList,
    }));
  };

  return (
    <Container index={index}>
        <Header>
            <HeadText>자기소개서 문항{index+1}</HeadText>
            {index+1===1?<EssentialText>* 필수 항목</EssentialText>:<></>}
        </Header>
        <Input placeholder='자기소개서 문항을 입력해주세요.' value={inputValue} onChange={handleInputChange}/>
        <ReadmeRadioButton index={index} inputQuestionValue={inputValue}/>
        <TextField text="기타" isEssential={false} placeHolder='추가적으로 넣고 싶은 내용을 입력해주세요.' paddingLeftZeroOption={true} onChange={handleOtherDataChange} />
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
  width:520px;
  height:40px;
  padding:10px;
`