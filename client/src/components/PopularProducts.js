import Product from "./Product";
import { ContainerProducts } from "./Styled_components";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as homeActions from "../store/actions/home";

const PopularProducts = (props) => {   
  
  useEffect(() => {   
    props.loadProductsDto();
  }, []);   

  return (
    <ContainerProducts>
      {  props.productsDto.length      
      ? props.productsDto.slice(0,4).map((value) => (            
            <Product value={value} key={value.id} />
          ))       
      : null }
    </ContainerProducts>
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