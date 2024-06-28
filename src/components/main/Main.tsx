import React from 'react'
import Header from '../Header'
import styled from 'styled-components'
import BigButton from '../button/BigButton'
import { useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate();
  return (
    <>
        <Header/>
        <Container>
            <TextContainer>
                <HeadTextContainer>
                <HeadText>완벽한 자기소개서를 작성하세요,</HeadText>
                <HeadText>WriteMe와 함께</HeadText>
                </HeadTextContainer>
                <DescTextContainer>
                <DescText>
                WriteMe에서는 모든 이야기가 훌륭하게 전달될 가치가 있다고 믿습니다. </DescText>
                <DescText>우리의 AI가 여러분의 고유한 정보를 분석하고 귀하의 본질, 야망 및 성취를 포착하는 설득력 있는 개인 진술서를 작성합니다.</DescText>
                
                </DescTextContainer>
            </TextContainer>
            <BigButton text="이동하기" valid={true} event={()=>{navigate('/input')}}/>
        </Container>
    </>
  )
}

export default Main

const Container=styled.div`
    display: flex;
    flex-direction: column;
    gap:50px;

    justify-content: center;
    align-items: center;

    margin: 10% auto;
`

const TextContainer=styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    gap:30px;

    width:60%;

    padding:40px;
`

const HeadTextContainer=styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
    justify-content: center;
    align-items: center;
`

const HeadText=styled.p`
    font-size: 60px;
    font-weight: bold;
`

const DescTextContainer=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DescText=styled.p`
    font-size: 20px;
    color: rgba(0, 0, 0, 0.5);

    align-items: center;
`