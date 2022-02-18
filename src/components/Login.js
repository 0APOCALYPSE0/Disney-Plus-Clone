import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';

function Login() {

  const navigate = useNavigate();
  const name = useSelector(selectUser).name;

  useEffect(() => {
    if(name){
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Background>
        <img src="/images/login-background.jpg" alt="login background" />
      </Background>
      <CTA>
        <CTALogoOne src='/images/cta-logo-one.svg' />
        <SignUp>GET ALL THERE</SignUp>
        <Description>
          Get Premier Access to Raya and the Last Dragon for an additional fee with a
          Disney+ subscription. As of 03/26/21, the price of Disney+ and The Disney
          Bundle will increase by $1.
        </Description>
        <CTALogoTwo src='/images/cta-logo-two.png' />
      </CTA>
    </Container>
  )
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: top;
  justify-content: center;
  position: relative;
  height: calc(100vh - 70px);
`

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.7;
  }
`

const CTA = styled.div`
  margin-top: 100px;
  max-width: 650px;
  padding: 80px 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CTALogoOne = styled.img`

`

const SignUp = styled.a`
  width: 100%;
  background-color: #0063e5;
  font-weight: bold;
  padding: 17px 0px;
  color: #f9f9f9;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 250ms;
  letter-spacing: 1.5px;
  margin-top: 8px;
  margin-bottom: 12px;
  &:hover{
    background-color: #0483ee;
  }
`

const Description = styled.p`
  font-size: 11px;
  text-align: center;:
  letter-spacing: 1.5px;
  line-height: 1.5;
`

const CTALogoTwo = styled.img`
  width: 90%;
`;