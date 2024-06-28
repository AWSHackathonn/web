import React, { useState } from 'react'
import styled from 'styled-components'
import { FiPlus} from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import {  useSetRecoilState } from 'recoil';
import { userInputURLAtom } from '../../stores/input/atom';

const InputReadme = () => {
    const [inputBoxes, setInputBoxes] = useState<string[]>(['']);
    const setUserInputURL=useSetRecoilState(userInputURLAtom);
  
  const handleAddInputBox = () => {
    if (inputBoxes.length < 3) {
      setInputBoxes([...inputBoxes, '']);
    }
  };

  const handleRemoveInputBox = (index: number) => {
    const newInputBoxes=inputBoxes.filter((_, i) => i !== index);
    setInputBoxes(newInputBoxes);
    updateUserInputURL(newInputBoxes);
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputBoxes = [...inputBoxes];
    newInputBoxes[index] = value;
    setInputBoxes(newInputBoxes);
    updateUserInputURL(newInputBoxes);
  };

  const isValidURL = (url: string): boolean => {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    if (!urlRegex.test(url)) {
      return false;
    }
  
    const readKeyword = 'READ';
    if (!url.toUpperCase().includes(readKeyword)) {
      return false;
    }
  
    return true;
  };

  const updateUserInputURL = (newInputBoxes: string[]) => {
    const validURLs = newInputBoxes.filter((url) => isValidURL(url));
    setUserInputURL(validURLs);
  };

  return (
    <Container>
        <Header>
            <HeadText>GitHub Readme.md URL</HeadText>
            <EssentialText>* 필수 / 최대 3개까지 가능합니다.</EssentialText>
        </Header>
        <InputContainer>
        {inputBoxes.map((input, index) => (
            <>
          <InputBox key={index}>
          <NumberText>{index+1+"."}</NumberText>
          <InputWrap focusBorder={index === 0}>
            <Input
              placeholder='ex) https://github.com/user/repository/blob/branch/README.md'
              value={input}
              onChange={(e) => {handleInputChange(index, e.target.value);}}
            />
            {index > 0 && <DeleteIcon onClick={()=>{handleRemoveInputBox(index);}} />}
            </InputWrap>          
          </InputBox>
          {input.trim().length > 0 && ( 
              <ValidText isValid={isValidURL(input)}>
                {isValidURL(input) ? '올바른 URL 형식입니다.' : 'URL을 정확히 입력해주세요.'}
              </ValidText>
            )}
        {index === inputBoxes.length - 1 && inputBoxes.length < 3 && (
              <PlusIcon onClick={handleAddInputBox} />
            )}
        </>
        ))}

        </InputContainer>
    </Container>
  )
}

export default InputReadme

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

const InputContainer=styled.div`
    display: flex;
    flex-direction: column;
    gap:13px;
`

const NumberText=styled.p`
    font-size: ${(props)=>props.theme.textStyles.subtitle5.fontSize};
    font-weight:bold;
`

const InputBox=styled.div`
    display: flex;
    align-items: center;
    gap:25px;

`

const ValidText=styled.p<{isValid:boolean}>`
    font-size:${(props)=>props.theme.textStyles.caption.fontSize};
    color:${(props)=>(props.isValid? props.theme.success:props.theme.error)};
    margin-left: 40px;
`

const Input=styled.input`
   background-color: none;
   width: 90%;
   height:30px;
   border: none;
   outline:none;
`

const InputWrap = styled.div<{ focusBorder?: boolean }>`
  display: flex;
  align-items: center;
  width: 480px;
  height: 40px;
  border-radius: 6px;
  padding: 8px;
  border: 1px solid #d9d9d9;
  
  ${(props) => props.focusBorder !== undefined && props.focusBorder && `
    border: 1px solid #d9d9d9;
  `}
  
  &:focus-within {
    border: 2px solid black;
  }
`;

const PlusIcon = styled(FiPlus)`
    margin: 0 auto;
    cursor: pointer;

    &:hover{
        color: ${(props)=>props.theme.blue};

        transition:0.4s;
    }

    font-size:${(props)=>props.theme.textStyles.subtitle4.fontSize};
`

const DeleteIcon = styled(CgClose)`
 cursor: pointer;
  color: #d9d9d9;

  &:hover {
    color: ${(props) => props.theme.error};
    transition: 0.4s;
  }

  margin-left: 25px;
`;