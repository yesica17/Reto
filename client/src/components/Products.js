import { popularProducts } from "../data";
import Product from "./Product";
import { ContainerProducts } from "./Styled_components";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as homeActions from "../store/actions/home";

const Products = (props) => {
  useEffect(() => {
    props.loadProducts();
  }, []);

  return (
    <ContainerProducts>
      {props.products.length
        ? //popularProducts.map((item) => <Product item={item} key={item.id} />)
          props.products.map((value) => (
            // <h1 key={value.id}>{value.styles[0].name}</h1>
            //<h1 key={value.id}>{value.img}</h1>
            <Product value={value} key={value.id} />
          ))
        : null}
    </ContainerProducts>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  products: state.home.products,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(homeActions.loadProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
