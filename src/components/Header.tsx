import React from 'react'
import { styled } from 'styled-components';
import { SiIrobot } from "react-icons/si";
import { theme } from '../styles/Theme';


const Header: React.FC = () => {
  return (
    <Container>
      <LayoutContainer>
        <HeaderWrapper>
          <HeaderContent>
            <LogoContainer>
              <SiIrobot />
            </LogoContainer>
            <Title>개인 맞춤형 자소서 작성 AI</Title>
          </HeaderContent>
        </HeaderWrapper>
      </LayoutContainer>
    </Container>
  );
};

export default Header

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f8fafb;
  overflow-x: hidden;
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
`;

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  border-bottom: 1px solid #e8edf3;
  padding: 10px 40px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: black;
`;

export const LogoContainer = styled.div`
  width: 16px;
  height: 16px;
`;

export const Title = styled.div`
  font-family: 'Pretendard';
  color: black;
  font-size: ${theme.textStyles.subtitle5.fontSize};
  font-weight: 700;
`;