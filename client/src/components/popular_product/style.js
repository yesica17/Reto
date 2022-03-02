import styled, { css } from "styled-components";
import { mobile } from "../../responsive";

export const ContainerSlider = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

export const ArrowSlider = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

export const WrapperSlider = styled.div`
  height: 100%;
  display: flex;
  background-color: #fff7f7;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

export const SlideProducts = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;  
  background-color: white;
`;