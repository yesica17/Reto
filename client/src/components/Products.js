import Product from "./Product";
import { ContainerProducts } from "./Styled_components";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as homeActions from "../store/actions/home";

const Products = (props) => {

   const [filteredProducts, setFilteredProducts] = useState([]); 
  
  useEffect(() => {
    props.loadProducts();
  }, []);   

const isInArrayStock = (array, arrayColorId, arraySizeId, category, arrayBrandId, item) =>{
            let flag = false;
            array.forEach(element => {
            if((arrayColorId.includes(element.colorId) || arrayColorId.length===0) 
            &&  (arraySizeId.includes(element.sizeId) || arraySizeId.length===0) &&     
            (element.product.categories[0].name === category || category === undefined) 
            && (arrayBrandId.includes(element.product.brands[0].id ) || arrayBrandId.length=== 0) && ((element.color.color.toLowerCase() === item) || (element.product.brands[0].name.toLowerCase() === item) || (element.product.styles[0].name.toLowerCase() === item) || (element.product.categories[0].name.toLowerCase() === item) || (element.size.size.toLowerCase() === item)|| item=== "")){
                flag = true;
            }
  });
  
  return flag;
};

  useEffect(() => {
    
    if(props.products.length && props.filters && props.cat){ 
       
      
      setFilteredProducts(
        props.products.filter(element=>isInArrayStock(element.stock, props.filters.color, props.filters.size, props.cat, props.filters.brand, props.filters.search))
      )}
  }, [props.products, props.filters, props.cat]);  

  console.log("cat", props.cat, "filtrados", filteredProducts)

  return (
    <ContainerProducts>
      {  props.cat    
      ? filteredProducts.length 
      ? filteredProducts.map((value) => (            
            <Product value={value} key={value.id} />
          ))
      : props.products.map((value) => (            
            <Product value={value} key={value.id} />
          ))      
      : props.products.slice(0,8).map((value) => (            
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
