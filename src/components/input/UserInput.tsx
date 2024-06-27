import React from "react";
import BigButton from "../button/BigButton";
import styled from "styled-components";
import TextField from "./TextField";
import InputReadme from "./InputReadme";
import InputQuestion from "./InputQuestion";

const UserInput = () => {
  const onSubmit=()=>{
    console.log("버튼 눌림");
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
    <TextField text="직무 정보" isEssential={true} placeHolder="직무 정보를 입력해주세요." paddingLeftZeroOption={false}/>
    <TextField text="기업 정보" isEssential={false} placeHolder="기업 정보를 입력해주세요." paddingLeftZeroOption={false}/>
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