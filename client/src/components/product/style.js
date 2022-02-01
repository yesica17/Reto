import styled, { css } from "styled-components";

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
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

export const ContainerProduct = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 450px;
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
  width: 40px;
  height: 40px;
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

export const ColorOption = styled.div`
  width: 20px;
  height: 20px;   
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: SlateGrey;  
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

export const FilterList= styled.div`
  display: flex;
  align-items: center;
`;