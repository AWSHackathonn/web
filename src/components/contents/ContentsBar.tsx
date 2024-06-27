import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';

interface ContentsBarProps {
    onDownloadClick: () => void;
}

const ContentsBar: React.FC<ContentsBarProps> = ({ onDownloadClick }) => {
    const handleDownloadClick = () => {
        console.log('ContentBar: handleDownloadClick called');
        onDownloadClick();
    };

    return (
        <Container>
            <Wrapper>
                <ContentSection>
                    <TextContainer>
                        <Text size="large">AI가 작성한 글입니다. 정보가 부정확할 수도 있으니 주의해주세요.</Text>
                        <Text size="small">Copy 버튼을 눌러 전체 내용을 복사하거나, Download 버튼을 눌러 pdf 형식으로 다운로드하세요.</Text>
                    </TextContainer>
                    <ButtonContainer>
                        <Button>
                            <ButtonText>Copy</ButtonText>
                        </Button>
                        <Button onClick={handleDownloadClick}>
                            <ButtonText>Download</ButtonText>
                        </Button>
                    </ButtonContainer>
                </ContentSection>
            </Wrapper>
        </Container>
    );
};

export default ContentsBar;

const Container = styled.div`
    font-family: 'Pretendard';
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1rem;
    margin: 2rem 0;
`;

const Wrapper = styled.div`
    width: 100%;
`;

const ContentSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 4rem;
    background-color: #f4f9ff;
    border: 1px solid #d1dbe5;
    border-radius: 12px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const Text = styled.div<{ size?: 'large' | 'small' }>`
    width: 100%;
    font-size: ${(props) =>
        props.size === 'large' ? theme.textStyles.subtitle4.fontSize : theme.textStyles.subtitle5.fontSize};
    line-height: ${(props) =>
        props.size === 'large' ? theme.textStyles.subtitle4.lineHeight : theme.textStyles.subtitle5.lineHeight};
    font-weight: ${(props) => (props.size === 'large' ? 'bold' : 'normal')};
    color: ${(props) => (props.size === 'large' ? 'black' : '#4f7396')};
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
`;

const Button = styled.div`
    width: 130px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    border-radius: 12px;
    overflow: hidden;
    background-color: black;
    cursor: pointer;
`;

const ButtonText = styled.div`
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};
    font-weight: bold;
    color: #f7fafa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
