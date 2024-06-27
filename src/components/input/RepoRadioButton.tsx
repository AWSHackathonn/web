import React, { useState } from 'react';
import { styled } from 'styled-components';

const RepoRadioButton = ({index}:{index:number}) => {
  const initialSelectedItems = index === 0 ? ['item1'] : [];
  const [selectedItems, setSelectedItems] = useState<string[]>(initialSelectedItems);

  const handleCheckboxChange = (item: string) => {
    if (selectedItems.includes(item)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== item));
      }
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
          <CheckBox
            type="checkbox"
            id="item1"
            checked={selectedItems.includes('item1')}
            onChange={() => {handleCheckboxChange('item1');}}
          />
          <Label htmlFor="item1">1</Label>
        </CheckboxItem>
        <CheckboxItem>
          <CheckBox
            type="checkbox"
            id="item2"
            checked={selectedItems.includes('item2')}
            onChange={() => {handleCheckboxChange('item2');}}
          />
          <Label htmlFor="item2">2</Label>
        </CheckboxItem>
        <CheckboxItem>
          <CheckBox
            type="checkbox"
            id="item3"
            checked={selectedItems.includes('item3')}
            onChange={() => {handleCheckboxChange('item3');}}
          />
          <Label htmlFor="item3">3</Label>
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
  gap: 108px;
  margin-top: 10px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBox=styled.input`
  width:16px;
  height:16px;
`

const Label=styled.label`
  font-size: ${(props) => props.theme.textStyles.subtitle5.fontSize};
`