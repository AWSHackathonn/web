import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import ContentsBar from './ContentsBar';
import { theme } from '../../styles/Theme';
import html3pdf from 'html3pdf';
import Header from '../Header';
import { useRecoilValue } from 'recoil';
import { getAnswerAtom } from "../../stores/atom";

interface ContentsAllProps {
  children?: React.ReactNode;
}

const Contents: React.FC<ContentsAllProps> = ({ children }) => {
  const [charCounts, setCharCounts] = useState<number[]>([]);
  const [copiedMessage, setCopiedMessage] = useState<string>('');
  const getAnswer = useRecoilValue(getAnswerAtom);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Split getAnswer into an array of answers
    const answersArray = getAnswer.split('<br>');
    console.log(getAnswerAtom);
    console.log(answersArray);
    setAnswers(answersArray);
  }, [getAnswer]);

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.paragraph-content');
    const counts: number[] = [];

    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent ?? '';
      const count = text.trim().length;
      counts.push(count);
    });

    setCharCounts(counts);
  }, [answers]); // Watch for changes in answers instead of children

  const concatenateParagraphs = () => {
    return answers.join('<br><br>');
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

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <InnerWrapper>
            <ContentSection>
              <Text size="small">전체</Text>
              <Text size="large">🎉자기소개서 완성</Text>
              <ContentsBar onDownloadClick={handleDownloadAllClick} onCopyClick={handleCopyAllClick} />
              {answers.map((answer, index) => (
                <TextBlock key={index}>
                  <TextInfoWrapper>
                    <Question>{`Q${index + 1}. 질문`}</Question>
                    <CharacterCount>{charCounts[index]}자</CharacterCount>
                  </TextInfoWrapper>
                  <Paragraph className="paragraph-content" onClick={() => handleParagraphClick(answer)}>
                    {answer}
                  </Paragraph>
                </TextBlock>
              ))}
              {copiedMessage && (
                <CopiedMessage>{copiedMessage}</CopiedMessage>
              )}
            </ContentSection>
          </InnerWrapper>
        </Wrapper>
      </Container>
    </>
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