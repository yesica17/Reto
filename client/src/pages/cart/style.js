import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const ContainerCart = styled.div``;

export const WrapperCart = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

export const TitleCart = styled.h3`
  font-weight: 300;    
  text-align: center;
`;

export const TopCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const TopButtonCart = styled.button`
  padding: 10px;
  width: 60%;
  font-weight: 600;
  cursor: pointer;
  border:-color: yellow;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  box-shadow: 2px 2px 2px black;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: black;
`;

export const EditButton= styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: DarkBlue
`;


export const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

export const BottomCart = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

export const InfoCart = styled.div`
  flex: 3; 
`;

export const ProductCart = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;  
  ${mobile({ flexDirection: "column" })}
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

export const ImageCart = styled.img`
  width: 200px;
`;

export const DetailsCart = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductName = styled.span``;

export const ProductId = styled.span``;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: SlateGrey; 
  background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProductAmount = styled.div`
  font-size: 14px;
  margin: 10px;
  ${mobile({ margin: "5px 15px" })}
`;

export const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

export const HrCart = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

export const SummaryTitle = styled.h1`
  font-weight: bold;
  font-size: 24px;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const ButtonCart = styled.button`
  width: 60%;
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
`;

export const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

export const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
`;

export const ButtonProd = styled.button`
  padding: 15px;
  background-color: black;
  border-radius: 5px;
  box-shadow: 3px 3px 3px gray;
  color: white;
  cursor: pointer;
  font-weight: 500;
  &:disabled {
    background-color: gainsboro;
    color: gray;
  }
`;

export const ImgContainerProd = styled.div`
  flex: 1;
`;

export const InfoContainer = styled.div`
  flex: 1;
  
  flex-direction: column;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
