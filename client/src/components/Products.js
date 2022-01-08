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

  const isInArrayStock = (array, colorId, sizeId, categoryId, brandId) =>{
  let flag = false;
  array.forEach(element => {
    if((element.colorId == colorId || colorId == undefined) && (element.colorId == sizeId || sizeId == undefined) && (element.product.categories[0].id == categoryId || categoryId == undefined) && (element.product.brands[0].id == brandId || brandId == undefined) ){
      flag = true;          
    }
  });    
  return flag;
};

  useEffect(() => {
    props.products.length && props.filters &&
      setFilteredProducts(
        props.products.filter(element=>isInArrayStock(element.stock, props.filters.color, props.filters.size, props.filters.category, props.filters.brand))
      );
  }, [props.products, props.filters, props.cat]);
  

  return (
    <ContainerProducts>
      {  props.cat 
      // ? filteredProducts.map((value) => (            
      //       <Product value={value} key={value.id} />
      //     ))
      ? props.products.map((value) => (            
            <Product value={value} key={value.id} />
          ))
      : props.products.slice(0,2).map((value) => (            
            <Product value={value} key={value.id} />
          ))
        }
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
