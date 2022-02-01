import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

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

export const WrapperNavbar = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

