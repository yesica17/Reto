import { Link } from "react-router-dom";
import { useState } from "react";
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
} from "./Styled_components";
import { sliderItems } from "../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <ContainerSlider>
      <ArrowSlider direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </ArrowSlider>
      <WrapperSlider slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainerSlider>
              <ImageSlider src={item.img} />
            </ImgContainerSlider>
            <InfoContainerSlider>
              <TitleSlider>{item.title}</TitleSlider>
              <DescSlider>{item.desc}</DescSlider>
              <Link to={`/products/${item.cat}`}>
                <ButtonSlider>VER AHORA</ButtonSlider>
              </Link>
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
