import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { userInputAtom, userInputURLAtom } from '../../stores/input/atom';

const ReadmeRadioButton = ({ index, inputQuestionValue }: { index: number, inputQuestionValue: string }) => {
  const userInputURL = useRecoilValue(userInputURLAtom);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [disabledState, setDisabledState] = useState<boolean>(false);

  const [userInput, setUserInput] = useRecoilState(userInputAtom);

  //선택 항목인데 문항이 뭔지 입력을 안했으면
  //선택을 애초에 못하게 하고, 체크된거 다 없앤다
  useEffect(() => {
    const newDisabledState = index !== 0 && inputQuestionValue === '';
    setDisabledState(newDisabledState);

    if (newDisabledState) {
      setSelectedItems([]);
    }
  }, [index, inputQuestionValue]);

  //체크박스 인덱스 값이랑 일치하는 주소 인덱스 값을 해서
  //체크 선택된 value로 주소값을 넣는다
  useEffect(() => {
    if (userInput.questionList[index]) {
      const address = userInput.questionList[index].address;
      if (address) {
        setSelectedItems(address);
      }
    }
  }, [index, userInput]);

  const handleCheckboxChange = (item: string) => {
    let newSelectedItems = [''];
    if (selectedItems.includes(item)) {
      if (selectedItems.length > 1) {
        newSelectedItems = selectedItems.filter((i) => i !== item);
      } else {
        newSelectedItems = [];
      }
    } else {
      newSelectedItems = [...selectedItems, item];
    }
    setSelectedItems(newSelectedItems);

    setUserInput((prevUserInput) => {
      const newQuestionList = [...prevUserInput.questionList];
      newQuestionList[index] = {
        ...newQuestionList[index],
        address: newSelectedItems,
      };
      return {
        ...prevUserInput,
        questionList: newQuestionList,
      };
    });
  };

  return (
    <Container>
      <Header>
        <HeadText>연결하고 싶은 GitHub 프로젝트 Readme</HeadText>
        {index === 0 && <EssentialText>* 필수 항목</EssentialText>}
      </Header>
      <CheckboxContainer>
        {userInputURL.map((url, idx) => (
          <CheckboxItem key={url}>
            <CheckBox
              type="checkbox"
              id={`item${idx + 1}`}
              value={url}
              checked={selectedItems.includes(url)}
              onChange={() => handleCheckboxChange(url)}
              disabled={disabledState}
            />
            <Label htmlFor={`item${idx + 1}`}>{idx + 1}</Label>
          </CheckboxItem>
        ))}
      </CheckboxContainer>
    </Container>
  );
};

export default ReadmeRadioButton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 30px 0;
`;

const Header = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const HeadText = styled.p`
  font-size: ${(props) => props.theme.textStyles.subtitle5.fontSize};
  font-weight: bold;
`;

const EssentialText = styled.p`
  color: ${(props) => props.theme.error};
  font-size: ${(props) => props.theme.textStyles.caption.fontSize};
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 108px;
  margin-top: 10px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.textStyles.subtitle5.fontSize};
`;