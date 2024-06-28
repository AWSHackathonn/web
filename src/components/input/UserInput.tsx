import React, { useState, useEffect } from "react";
import BigButton from "../button/BigButton";
import styled from "styled-components";
import TextField from "./TextField";
import InputReadme from "./InputReadme";
import InputQuestion from "./InputQuestion";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInputAtom, userInputURLAtom } from "../../stores/input/atom";
import Header from "../Header";
import { postUserInput } from "../../api/postUserInput";
import AddContainer from "./AddContainer";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const [userInput, setUserInput] = useRecoilState(userInputAtom);
  const userInputURL = useRecoilValue(userInputURLAtom);
  const [valid, setValid] = useState(false); // 필수 항목이 모두 채워졌는지 여부

  const [questionCount, setQuestionCount] = useState(1);

  const navigate= useNavigate();

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

  const handleRemoveInputBox = (index: number) => {
    setUserInput((prevUserInput) => {
      const newQuestionList = prevUserInput.questionList.filter((_, i) => i !== index);
      return {
        ...prevUserInput,
        questionList: newQuestionList,
      };
    });
    setQuestionCount(questionCount - 1); // 질문 개수 감소
  };

  const onSubmit = async () => {
    try {
      const response = await postUserInput(userInput);
      console.log('Response:', response);
      navigate('/contents');
    } catch (error) {
      alert('데이터 전송에 실패했습니다. 관리자에게 문의해주세요! \n관리자 전화번호는 010-4...');
    }
  };

  useEffect(() => {
    // 유효성 검사 로직 추가
    if (
      userInput.jobRole !== '' &&
      userInputURL.length !== 0 &&
      userInput.questionList[0]?.address.length !== 0 && // questionList의 첫 번째 요소가 존재하는지 체크
      userInput.questionList[0]?.question !== '' // questionList의 첫 번째 요소의 question이 비어있지 않은지 체크
    ) {
      setValid(true); // 모든 필수 항목이 채워졌으면 버튼 활성화
    } else {
      setValid(false); // 하나라도 비어 있으면 버튼 비활성화
    }
  }, [userInput.jobRole, userInputURL, userInput.questionList]);

  const handleAddQuestion = () => {
    if (questionCount < 3) {
      setQuestionCount(questionCount + 1); // 최대 5개까지 추가 가능
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Head>
          <Title>정보 입력하기</Title>
          <SmallTitle>자기소개서 작성을 위한 정보를 입력해주세요</SmallTitle>
        </Head>
        <InputContainer>
          <TextField
            text="직무 정보"
            isEssential={true}
            placeHolder="직무 정보를 입력해주세요."
            paddingLeftZeroOption={false}
            onChange={handleJobRoleChange}
            value={userInput.jobRole}
          />
          <TextField
            text="기업 정보"
            isEssential={false}
            placeHolder="기업 정보를 입력해주세요."
            paddingLeftZeroOption={false}
            onChange={handleCompanyChange}
            value={userInput.company}
          />
          <InputReadme />
          {[...Array(questionCount)].map((_, index) => (
            <>
            <QuestionContainer key={index}>
              <InputQuestion index={index} handleRemoveInputBox={handleRemoveInputBox} />
            </QuestionContainer>
            {index === questionCount - 1 && questionCount < 3 && (
              <AddContainer text="문항 추가하기" event={handleAddQuestion}/>
            )}
            </>
          ))}
        </InputContainer>
          <BigButton text="제출" event={onSubmit} valid={valid} />
      </Container>
    </>
  );
};

export default UserInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.textStyles.subtitle2.fontSize};
`;

const SmallTitle = styled.p`
  font-size: ${props => props.theme.textStyles.subtitle5.fontSize};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 0;
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
`;