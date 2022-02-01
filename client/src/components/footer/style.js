import styled, { css } from "styled-components";
import { mobile } from "../../responsive";


export const ContainerFooter = styled.div`
  display: flex;
  background-color: black;
  ${mobile({ flexDirection: "column" })}
`;

export const LeftFooter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const LogoFooter = styled.h5`
color: white;
`;

export const DescFooter = styled.p`
  margin: 20px 0px;
  text-align: justify;  
  
`;

export const SocialContainerFooter = styled.div`
  display: flex;
`;

export const SocialIconFooter = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const CenterFooter = styled.div`
  flex: 1;
  padding: 10px;
  ${mobile({ display: "none" })}
`;

export const TitleFooter = styled.h5`
  margin-bottom: 30px;
  color: white;
`;
export const RightFooter = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

export const ContactItemFooter = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;