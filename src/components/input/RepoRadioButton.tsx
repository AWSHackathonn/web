import React, { useState } from 'react';
import { styled } from 'styled-components';

const RepoRadioButton = ({index}:{index:number}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (item:string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <Container>
      <Header>
        <HeadText>연결하고 싶은 GitHub Repository</HeadText>
        {index===0 &&<EssentialText>* 필수 항목</EssentialText>}
      </Header>
      <CheckboxContainer>
        <CheckboxItem>
          <input
            type="checkbox"
            id="item1"
            checked={selectedItems.includes('item1')}
            onChange={() => {handleCheckboxChange('item1');}}
          />
          <label htmlFor="item1">1</label>
        </CheckboxItem>
        <CheckboxItem>
          <input
            type="checkbox"
            id="item2"
            checked={selectedItems.includes('item2')}
            onChange={() => {handleCheckboxChange('item2');}}
          />
          <label htmlFor="item2">2</label>
        </CheckboxItem>
        <CheckboxItem>
          <input
            type="checkbox"
            id="item3"
            checked={selectedItems.includes('item3')}
            onChange={() => {handleCheckboxChange('item3');}}
          />
          <label htmlFor="item3">3</label>
        </CheckboxItem>
      </CheckboxContainer>
    </Container>
  );
};

export default RepoRadioButton;

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
  gap: 112px;
  margin-top: 10px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

