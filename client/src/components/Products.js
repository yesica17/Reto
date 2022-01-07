import Product from "./Product";
import { ContainerProducts } from "./Styled_components";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as homeActions from "../store/actions/home";

const Products = (props) => {

   const [filteredProducts, setFilteredProducts] = useState();
  
  useEffect(() => {
    props.loadProducts();
  }, []); 

  return (
    <ContainerProducts>
      {props.products.length
        ?  props.products.map((value) => (            
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
