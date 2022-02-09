import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const WrapperNavbar = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

export const LeftNavbar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const SearchContainerNavbar = styled.div`
  border: 0.5px solid lightgray;
  width:35%;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

export const InputNavbar = styled.input`
  border: none;
  width:100%;
  ${mobile({ width: "50px" })}
`;

export const InfoProduct = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;  
  align-items: flex-end;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

export const ContainerProduct = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 200px;
  height: 350px;
  display: flex;  
  flex-direction: column;  
  align-items: center;
  justify-content: center;  
  background-color: white;
  position: relative;
  &:hover ${InfoProduct} {
    opacity: 1;
  }
`;

export const ImageProduct = styled.img`
  height: 75%;  
  z-index: 2;
`;

export const IconProduct = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: MintCream;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #fff7f7;
    transform: scale(1.1);
  }
`;

export const ContainerProducts = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const FormRegister = styled.form` 
  display: flex;
  flex-wrap: wrap;  
  width: 80%;  
  height: 50vh;
  margin: 0 auto;
  justify-content: center;
`;

export const ButtonRegister = styled.button`
  width: 15%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: DodgerBlue;
  color: white;
  font-weight: 600;
  box-shadow: 3px 3px 3px gray;
`;

export const Container = styled.div``;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

