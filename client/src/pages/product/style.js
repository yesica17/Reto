import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const ContainerProd = styled.div``;

export const WrapperProd = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

export const ImgContainerProd = styled.div`
  flex: 1;
`;

export const ImageProd = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

export const TitleProd = styled.h3`
  font-weight: bold;
`;

export const DescProd = styled.p`
  margin: 20px 0px;
`;

export const Price = styled.span`
  font-weight: 100;
  font-size: 35px;
`;

export const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

export const Filter = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

export const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const FilterColor = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const FilterColorOption = styled.option``;

export const FilterSizeOption = styled.option``;

export const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
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