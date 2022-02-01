import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const ContainerLogin = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/9pfzxj2/pexels-daniel-adesina-833052.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperLogin = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 7px;     
  ${mobile({ width: "75%" })}
`;

export const TitleLogin = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const FormLogin = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: center; 
`;

export const InputLogin = styled.input`
  flex: 1;
  min-width: 80%;
  margin: 10px 0;
  padding: 10px; 
`;

export const ButtonLogin = styled.button`
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const LinkLogin = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  font-weight: bolder;
  text-decoration: underline;
  cursor: pointer;
`;