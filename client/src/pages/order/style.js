import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const ButtonOrder = styled.button`
  width: 30%;
  padding: 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
`;

export const InfoOrder = styled.div`
  flex: 3; 
`;

export const ProductOrder = styled.div`
  display: flex;
  justify-content: space-between; 
  height: 30vh;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: black;  
  ${mobile({ flexDirection: "column" })}
`;

export const ProductDetailOrder = styled.div`
  flex: 2.5;
  display: flex;  
`;

export const ImageOrder = styled.img`
  width: 150px;
`;

export const ProductTitle = styled.span`
    font-size: 14px;
`;

export const PriceOrder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;

export const DetailsOrder = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;