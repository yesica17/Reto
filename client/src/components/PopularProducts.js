import Product from "./Product";
import {ContainerSlider, ArrowSlider, WrapperSlider, SlideProducts } from "./Styled_components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as homeActions from "../store/actions/home";

const PopularProducts = (props) => {   
  
  useEffect(() => {   
    props.loadProductsDto();
  }, []);   

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
          <SlideProducts > 
              {  props.productsDto.length      
                  ? props.productsDto.slice(0,8).map((value) => (            
                        <Product value={value} key={value.id} />
                      ))       
                  : null }          
          </SlideProducts>
      </WrapperSlider>
      <ArrowSlider direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </ArrowSlider>
    </ContainerSlider>  
  );
};

//leer estados
const mapStateToProps = (state) => ({  
  productsDto: state.home.productsDto,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({  
  loadProductsDto: () => dispatch(homeActions.loadProductsDto()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularProducts);