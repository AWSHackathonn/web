import React, { useState } from 'react';
import { styled } from 'styled-components';
import ReadmeRadioButton from './ReadmeRadioButton';
import TextField from './TextField';
import { useRecoilState } from 'recoil';
import { userInputAtom } from '../../stores/input/atom';
import { CgClose } from 'react-icons/cg';

type InputQuestionProps = {
  index: number;
  handleRemoveInputBox?: (index: number) => void; // handleRemoveInputBox prop 추가
};

const InputQuestion = ({ index, handleRemoveInputBox }: InputQuestionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [userInput, setUserInput] = useRecoilState(userInputAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestionList = [...userInput.questionList];
    updatedQuestionList[index] = {
      ...updatedQuestionList[index],
      question: event.target.value,
    };

    setUserInput((prevState) => ({
      ...prevState,
      questionList: updatedQuestionList,
    }));

    setInputValue(event.target.value);
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

  const handleRemoveQuestion = () => {
    if (handleRemoveInputBox) {
      handleRemoveInputBox(index); // 부모 컴포넌트로 삭제 이벤트 전달
    }
  };

  return (
    <Container index={index}>
      <Header>
        <HeadText>자기소개서 문항 {index + 1}</HeadText>
        {index + 1 === 1 ? <EssentialText>* 필수</EssentialText> : null}
        {index > 0 && <DeleteIcon onClick={handleRemoveQuestion} />}
      </Header>
      <Input placeholder="자기소개서 문항을 입력해주세요." value={inputValue} onChange={handleInputChange} />
      <ReadmeRadioButton index={index} inputQuestionValue={inputValue} />
      <TextField
        text="기타"
        isEssential={false}
        placeHolder="추가적으로 넣고 싶은 내용을 입력해주세요."
        paddingLeftZeroOption={true}
        onChange={handleOtherDataChange}
        disabled={!inputValue}
      />
    </Container>
  );
};

export default InputQuestion;

const Container = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 20px 60px 10px;
  border-bottom: ${(props) => (props.index < 4 ? '1px solid #d9d9d9' : 'none')};
`;

const Header = styled.div`
    display:flex;
    gap:5px;
    align-items: center;
    justify-content: space-between;
`

const HeadText = styled.p`
    font-size:${(props) => props.theme.textStyles.subtitle5.fontSize};
    font-weight: bold;
`

const EssentialText = styled.p`
    color:${(props) => props.theme.error};
    font-size:${(props) => props.theme.textStyles.caption.fontSize};
`

const Input = styled.input`
     border-radius: 6px;
  border: 1px solid #d9d9d9;
  width:520px;
  height:40px;
  padding:10px;
`

const DeleteIcon = styled(CgClose)`
  cursor: pointer;
  color: red;

  &:hover {
    color: ${props => props.theme.error};
    transition: 0.4s;
  }

  margin-bottom: 2px;
  margin-right: 5px;
`;