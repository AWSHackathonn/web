import React, { useState } from 'react'
import styled from 'styled-components'
import { FiPlus} from "react-icons/fi";
import { CgClose } from "react-icons/cg";

// isValid 하드코딩상태
const InputRepo = ({isValid}:{isValid:boolean}) => {
    const [inputBoxes, setInputBoxes] = useState<string[]>(['']);

  const handleAddInputBox = () => {
    if (inputBoxes.length < 3) {
      setInputBoxes([...inputBoxes, '']);
    }
  };

  const handleRemoveInputBox = (index: number) => {
    setInputBoxes(inputBoxes.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputBoxes = [...inputBoxes];
    newInputBoxes[index] = value;
    setInputBoxes(newInputBoxes);
  };

  return (
    <Container>
        <Header>
            <HeadText>GitHub Repository URL</HeadText>
            <EssentialText>* 필수 항목</EssentialText>
        </Header>
        <InputContainer>
        {inputBoxes.map((input, index) => (
            <>
          <InputBox key={index}>
          <NumberText>{index+1+"."}</NumberText>
          <InputWrap focusBorder={index === 0}>
            <Input
              placeholder='ex) https://github.com/username/project'
              value={input}
              onChange={(e) => {handleInputChange(index, e.target.value);}}
            />
            
            
            {index > 0 && <DeleteIcon onClick={()=>{handleRemoveInputBox(index);}} />}
            </InputWrap>
            
          </InputBox>
          <ValidText isValid={isValid}>
          {isValid ? '올바른 url 형식입니다.' : 'url을 정확히 입력해주세요.'}
        </ValidText>
        {index === inputBoxes.length - 1 && inputBoxes.length < 3 && (
              <PlusIcon onClick={handleAddInputBox} />
            )}
        </>
        ))}

        </InputContainer>
    </Container>
  )
}

export default InputRepo

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