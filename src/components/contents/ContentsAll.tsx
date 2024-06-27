import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ContentsBar from './ContentsBar';
import { theme } from '../../styles/Theme';
import html3pdf from 'html3pdf';

interface ContentsAllProps {
  children?: React.ReactNode;
}

const ContentsAll: React.FC<ContentsAllProps> = ({ children }) => {
  const [charCounts, setCharCounts] = useState<number[]>([]);

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.paragraph-content');
    const counts: number[] = [];

    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent ?? '';
      const count = text.trim().length;
      counts.push(count);
    });

    setCharCounts(counts);
  }, [children]);

  const handleDownloadAllClick = () => {
    const opt = {
      margin: 1,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // 모든 단락을 선택하여 변환 후 저장
    const paragraphs = document.querySelectorAll('.paragraph-content');
    paragraphs.forEach((paragraph, index) => {
      html3pdf().set(opt).from(paragraph).save().then(() => {
        console.log(`PDF ${index} 생성 후 저장`);
      }).catch((error: any) => {
        console.error(`PDF ${index} 생성 에러: `, error);
      });
    });
  };

  const dummyData = [
    {
      question: 'Q1. 이러이러한 질문 1',
      paragraph: '저는 고품질 소프트웨어 구축에 대한 열정을 갖고 있는 숙련된 소프트웨어 엔지니어입니다. 내 경험에는 핀테크, 의료, 전자상거래 등 다양한 산업 분야의 소프트웨어 개발이 포함됩니다. 저는 컴퓨터 공학에 대한 탄탄한 배경 지식을 갖고 있으며 시간과 예산에 맞춰 복잡한 프로젝트를 납품한 입증된 실적을 갖고 있습니다. 저는 학습 속도가 빠르고 빠르게 진행되는 협업 환경에서 뛰어난 능력을 발휘합니다. 나는 내 기술과 경험을 활용하여 중요한 영향을 미칠 수 있는 도전적인 역할을 찾고 있습니다. 영어 직역한 거라서 이상하다.'
    },
    {
      question: 'Q2. 이러이러한 질문 2',
      paragraph: '두 번째 단락 글입니다.'
    },
    {
      question: 'Q3. 이러이러한 질문 3',
      paragraph: '세 번째 단락 글입니다..'
    },
    {
      question: 'Q4. 이러이러한 질문 4',
      paragraph: '네 번째 단락 글입니다...'
    },
  ];

  return (
    <Container>
      <Wrapper>
        <InnerWrapper>
          <ContentSection>
            <Text size="small">뭐 쓰지</Text>
            <Text size="large">자기소개서 완성</Text>
            <ContentsBar onDownloadClick={handleDownloadAllClick} />
            {dummyData.map((item, index) => (
              <TextBlock key={index}>
                <Question>{item.question}</Question>
                <Paragraph className="paragraph-content">{item.paragraph}</Paragraph>
                <CharacterCount>{charCounts[index]}자</CharacterCount>
              </TextBlock>
            ))}
          </ContentSection>
        </InnerWrapper>
      </Wrapper>
    </Container>
  );
};

export default ContentsAll;

const Container = styled.div`
  font-family: 'Pretendard';
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: #fff;
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: #f7fafa;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: #fff;
`;

const ContentSection = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  overflow: hidden;
  padding: 1.5rem 10rem;
`;

const TextBlock = styled.div`
  width: 100%;
  min-height: 12rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const Text = styled.div<{ size?: 'large' | 'small' }>`
  width: 100%;
  font-size: ${(props) =>
    props.size === 'large' ? theme.textStyles.subtitle1.fontSize : theme.textStyles.subtitle4.fontSize};
  line-height: ${(props) =>
    props.size === 'large' ? theme.textStyles.subtitle1.lineHeight : theme.textStyles.subtitle4.lineHeight};
  font-weight: ${(props) => (props.size === 'large' ? '700' : '600')};
  color: black;
`;

const Question = styled.div`
  width: 100%;
  font-size: ${theme.textStyles.subtitle4.fontSize};
  line-height: ${theme.textStyles.subtitle4.lineHeight};
  font-weight: bold;
  color: #2565c8;
  text-decoration: underline;
`;

const Paragraph = styled.div`
  width: 100%;
  font-size: ${theme.textStyles.subtitle5.fontSize};
  line-height: ${theme.textStyles.subtitle5.lineHeight};
  color: #0d141c;
  padding: 1rem 2rem;
`;

const CharacterCount = styled.div`
  width: 100%;
  font-size: ${theme.textStyles.caption.fontSize};
  line-height: ${theme.textStyles.caption.lineHeight};
  font-weight: bold;
  color: #00000080;
  text-align: right;
  padding: 0 2rem;
`;
