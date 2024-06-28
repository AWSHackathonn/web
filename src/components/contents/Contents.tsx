import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ContentsBar from './ContentsBar';
import { theme } from '../../styles/Theme';
import html3pdf from 'html3pdf';
import Header from '../Header';

interface ContentsAllProps {
  children?: React.ReactNode;
}

const Contents: React.FC<ContentsAllProps> = ({ children }) => {
  const [charCounts, setCharCounts] = useState<number[]>([]);
  const [copiedMessage, setCopiedMessage] = useState<string>('');

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

  const concatenateParagraphs = () => {
    return dummyData.map((item, index) => {
      return `${item.question}<br>${item.paragraph}`;
    }).join('<br><br>');
  };  

  const handleDownloadAllClick = () => {
    const opt = {
      margin: 1,
      filename: '자기소개서.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const concatenatedParagraph = concatenateParagraphs();

    const container = document.createElement('div');
    container.style.visibility = 'hidden';
    document.body.appendChild(container);

    container.innerHTML = `
      <div class="pdf-content" style="font-family: 'Pretendard'; font-weight: 500; font-size: 15px; line-height: 2.0; color: #000;">
        ${concatenatedParagraph}
      </div>
    `;

    html3pdf().set(opt).from(container.querySelector('.pdf-content')).save().then(() => {
      document.body.removeChild(container);
    }).catch((error: any) => {
      console.error('PDF 생성 에러: ', error);
      document.body.removeChild(container);
    });
  };

  const handleCopyAllClick = () => {
    const concatenatedParagraph = concatenateParagraphs();
    
    const textToCopy = concatenatedParagraph.replace(/<br>/g, '\n');
  
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopiedMessage('👏 복사 완료');
        setTimeout(() => {
          setCopiedMessage('');
        }, 2000); // 2초 후 숨김
      })
      .catch((error) => {
        console.error('복사 에러: ', error);
      });
  };  

  const handleParagraphClick = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedMessage('👏 복사 완료');
        setTimeout(() => {
          setCopiedMessage('');
        }, 2000); // 2초 후 숨김
      })
      .catch((error) => {
        console.error('복사 에러: ', error);
      });
  };

  const dummyData = [
    {
      question: 'Q1. 이러이러한 질문 1',
      paragraph: '1저는 고품질 소프트웨어 구축에 대한 열정을 갖고 있는 숙련된 소프트웨어 엔지니어입니다. 내 경험에는 핀테크, 의료, 전자상거래 등 다양한 산업 분야의 소프트웨어 개발이 포함됩니다. 저는 컴퓨터 공학에 대한 탄탄한 배경 지식을 갖고 있으며 시간과 예산에 맞춰 복잡한 프로젝트를 납품한 입증된 실적을 갖고 있습니다. 저는 학습 속도가 빠르고 빠르게 진행되는 협업 환경에서 뛰어난 능력을 발휘합니다. 나는 내 기술과 경험을 활용하여 중요한 영향을 미칠 수 있는 도전적인 역할을 찾고 있습니다. 영어 직역한 거라서 이상하다.'
    },
    {
      question: 'Q2. 이러이러한 질문 2',
      paragraph: '2저는 고품질 소프트웨어 구축에 대한 열정을 갖고 있는 숙련된 소프트웨어 엔지니어입니다. 두 번째 단락 글입니다.'
    },
    {
      question: 'Q3. 이러이러한 질문 3',
      paragraph: '333저는 고품질 소프트웨어 구축에 대한 열정을 갖고 있는 숙련된 소프트웨어 엔지니어입니다. 내 경험에는 핀테크, 의료, 전자상거래 등 다양한 산업 분야의 소프트웨어 개발이 포함됩니다. 저는 컴퓨터 공학에 대한 탄탄한 배경 지식을 갖고 있으며 시간과 예산에 맞춰 복잡한 프로젝트를 납품한 입증된 실적을 갖고 있습니다. 저는 학습 속도가 빠르고 빠르게 진행되는 협업 환경에서 뛰어난 능력을 발휘합니다. 나는 내 기술과 경험을 활용하여 중요한 영향을 미칠 수 있는 도전적인 역할을 찾고 있습니다. 영어 직역한 거라서 이상하다.'
    },
    {
      question: 'Q4. 이러이러한 질문 4',
      paragraph: '444444444444444444저는 고품질 소프트웨어 구축에 대한 열정을 갖고 있는 숙련된 소프트웨어 엔지니어입니다. 내 경험에는 핀테크, 의료, 전자상거래 등 다양한 산업 분야의 소프트웨어 개발이 포함됩니다. 저는 컴퓨터 공학에 대한 탄탄한 배경 지식을 갖고 있으며 시간과 예산에 맞춰 복잡한 프로젝트를 납품한 입증된 실적을 갖고 있습니다. 저는 학습 속도가 빠르고 빠르게 진행되는 협업 환경에서 뛰어난 능력을 발휘합니다. 나는 내 기술과 경험을 활용하여 중요한 영향을 미칠 수 있는 도전적인 역할을 찾고 있습니다. 영어 직역한 거라서 이상하다.'
    },
  ];

  return (
    <><Header />
      <Container>
        <Wrapper>
          <InnerWrapper>
            <ContentSection>
              <Text size="small">전체</Text>
              <Text size="large">🎉자기소개서 완성</Text>
              <ContentsBar onDownloadClick={handleDownloadAllClick} onCopyClick={handleCopyAllClick} />
              {dummyData.map((item, index) => (
                <TextBlock key={index}>
                  <TextInfoWrapper>
                    <Question>{item.question}</Question>
                    <CharacterCount>{charCounts[index]}자</CharacterCount>
                  </TextInfoWrapper>
                  <Paragraph className="paragraph-content" onClick={() => handleParagraphClick(item.paragraph)}>
                    {item.paragraph}
                  </Paragraph>
                </TextBlock>
              ))}
              {copiedMessage && (
                <CopiedMessage>{copiedMessage}</CopiedMessage>
              )}
            </ContentSection>
          </InnerWrapper>
        </Wrapper>
      </Container></>
  );
};

export default Contents;

const Container = styled.div`
  font-family: 'Pretendard';
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: white;
  margin-top: 5rem;
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: white;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: white;
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
  padding: 2rem;
  min-height: 8rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const TextInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled.div<{ size?: 'large' | 'small' }>`
  width: 100%;
  font-size: ${(props) =>
    props.size === 'large' ? theme.textStyles.subtitle1.fontSize : theme.textStyles.subtitle5.fontSize};
  line-height: ${(props) =>
    props.size === 'large' ? theme.textStyles.subtitle1.lineHeight : theme.textStyles.subtitle5.lineHeight};
  font-weight: ${(props) => (props.size === 'large' ? '700' : '600')};
  color: black;
  margin-bottom: 1rem;
`;

const Question = styled.div`
  width: 100%;
  font-size: ${theme.textStyles.subtitle4.fontSize};
  line-height: ${theme.textStyles.subtitle4.lineHeight};
  font-weight: bold;
  color: ${theme.blue};
  text-decoration: underline;
`;

const Paragraph = styled.div`
  width: 100%;
  font-size: ${theme.textStyles.subtitle5.fontSize};
  line-height: ${theme.textStyles.subtitle5.lineHeight};
  color: black;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const CharacterCount = styled.div`
  width: 100%;
  font-size: ${theme.textStyles.caption.fontSize};
  line-height: ${theme.textStyles.caption.lineHeight};
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
`;

const CopiedMessage = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  background-color: ${theme.success};
  color: white;
  font-weight: 700;
  font-size: ${theme.textStyles.subtitle3};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  animation: fadeInOut 2s ease-in-out;
  
  @keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
`;