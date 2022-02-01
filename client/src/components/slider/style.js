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

export const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: 100% 100%;
  background-repeat:no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.img});
`;

export const ImgContainerSlider = styled.div`
  height: 100%;
  flex: 1;
`;

export const ImageSlider = styled.img`
  height: 80%;
`;

export const InfoContainerSlider = styled.div`
  flex: 1;
  padding: 70px;  
  
`;

export const TitleSlider = styled.h1`
  font-size: 60px;
  color: white;
  text-align: right;
  text-shadow: 2px 2px 2px gray;
`;

export const DescSlider = styled.p`
  margin: 30px 300px;
  font-size: 20px;
  font-weight: 500;
  text-align: justify;
  letter-spacing: 3px;
  color: white;
`;

export const DescCollection = styled.p`
  margin: 10px 0px;
  text-align: right;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 3px;
  color: white;
`;

export const ButtonSlider = styled.button`
  padding: 10px;
  margin: 10px 500px;
  color: white;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;