import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import {
  ContainerSlider,
  ArrowSlider,
  WrapperSlider,
  Slide,
  ImgContainerSlider,
  ImageSlider,
  InfoContainerSlider,
  TitleSlider,
  DescSlider,
  ButtonSlider,
  DescCollection
} from "./Styled_components";
import { sliderItems } from "../data";

const Slider = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 1);
    } else {
      setSlideIndex(slideIndex < 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <ContainerSlider>
      <ArrowSlider direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </ArrowSlider>
      <WrapperSlider slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          
          <Slide img={item.img} key={item.id}>            
            <InfoContainerSlider>              
              <TitleSlider>{item.title}</TitleSlider>
              <DescCollection>{item.collection}</DescCollection>
              <DescSlider>{item.desc}</DescSlider>

              <ButtonSlider>VER AHORA</ButtonSlider>
            </InfoContainerSlider>
          </Slide>
        ))}
      </WrapperSlider>
      <ArrowSlider direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </ArrowSlider>
    </ContainerSlider>
  );
};

export default Slider;
