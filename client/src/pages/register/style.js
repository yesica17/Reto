import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const ContainerRegister = styled.div`
  width: 100vw;
  height: 120vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/DGs3Fmk/pexels-isabella-mariana-1988681.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperRegister = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

export const TitleRegister = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const FormRegister = styled.form`
  display: flex;
  flex-wrap: wrap;  
  width: 70%;
  margin: 0 auto;
  justify-content: center;
  border-radius: 7px;
  border-width: 2px;
  border-style: solid;
  border-color: black;
`;

export const InputRegister = styled.input`
  flex: 0.1;
  min-width: 80%;
  margin: 10px 10px 0px 0px;
  padding: 5px;
  &:invalid ~ span {
    display: block;
  }
`;

export const FilterID = styled.select`
  flex: 0.5;
  min-width: 80%;
  margin: 20px 10px 0px 0px;
  padding: 7px;
`;

export const FilterIDOption = styled.option``;

export const AgreementRegister = styled.span`
  font-size: 14px;
  margin: 30px 35px;
  text-align: justify;
  color: LightSlateGray;
`;

export const ButtonRegister = styled.button`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
`;

export const Error = styled.span`
  font-size: 13px;
  padding: 3px;
  margin-left: 30px;
  margin-right: 40px;
  color: DarkRed;
  font-weight: bold;
  display: none;
  text-align: justify;
`;