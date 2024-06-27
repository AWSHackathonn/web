import React from "react";
import BigButton from "../button/BigButton";
import styled from "styled-components";
import TextField from "./TextField";
import InputReadme from "./InputReadme";
import InputQuestion from "./InputQuestion";
import { useRecoilState } from "recoil";
import { userInputAtom } from "../../stores/input/atom";

const UserInput = () => {
  const [userInput, setUserInput]=useRecoilState(userInputAtom);

  const handleJobRoleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput({
      ...userInput,
      jobRole: event.target.value,
    });
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput({
      ...userInput,
      company: event.target.value,
    });
  };

  const onSubmit=()=>{
    console.log(userInput);
  }

  return(
  <>
  <Header/>
  <Container>
    <Head>
      <Title>정보 입력하기</Title>
      <SmallTitle>자기소개서를 위한 정보를 입력해주세요</SmallTitle>
    </Head>
    <InputContainer>
    <TextField text="직무 정보" isEssential={true} placeHolder="직무 정보를 입력해주세요." paddingLeftZeroOption={false} onChange={handleJobRoleChange} value={userInput.jobRole}/>
    <TextField text="기업 정보" isEssential={false} placeHolder="기업 정보를 입력해주세요." paddingLeftZeroOption={false} onChange={handleCompanyChange} value={userInput.company}/>
    <InputReadme />
    {[...Array(5)].map((_, index) => (
    <InputQuestion index={index} key={index} />
))}
    </InputContainer>
    <BigButton text="제출" event={onSubmit}/>
    </Container>
    </>
  )
};

export default UserInput;

const Header=styled.div`
  height:48px;
  background-color: gray;
`

const Container=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;

  padding:64px 0;
`

const Head=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

`

const Title=styled.h1`
  font-size:${(props)=>props.theme.textStyles.subtitle2.fontSize};
`

const SmallTitle=styled.p`
font-size:${(props)=>props.theme.textStyles.subtitle5.fontSize};
`

const InputContainer=styled.div`
  display: flex;
  flex-direction: column;
  gap:40px;

  padding:40px 0;
`