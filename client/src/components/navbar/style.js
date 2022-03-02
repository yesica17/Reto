import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const ContainerNavbar = styled.div`
  height: 70px;
  ${mobile({ height: "50px" })}
`;

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

export const ButtonNavbar = styled.button`
  padding: 10px;
  font-size: 30px;
  color: white;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const CenterNavbar = styled.div`
  flex: 1;
  text-align: center;
`;

export const RightNavbar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

export const MenuItemNavbar = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;