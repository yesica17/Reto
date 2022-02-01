import Product from "../product/Product";
import { ContainerProducts } from "./style";
import { RemoveShoppingCart} from "@material-ui/icons";
import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as homeActions from "../../store/actions/home";

const Products = (props) => {
   
        const [filteredData, setFilteredData] = useState([]); 
        
        useEffect(() => {
            props.loadProducts();
            props.loadProductsDto();
        }, []);   

        useEffect(() => {
                if(props.productsDto.length){ 
                    const search=props.wordEntered? props.wordEntered.search.toLowerCase() : "";
                    const f=props.filters     

                    const dataFiltered = props.productsDto.filter(item=>((item.id_color.filter(c => f.color.includes(c)).length || !f.color.length) 
                        && (item.id_size.filter(c => f.size.includes(c)).length || !f.size.length) 
                        && (item.id_cat.filter(c => f.category.includes(c)).length || !f.category.length) 
                        && (item.id_brand.filter(c => f.brand.includes(c)).length || !f.brand.length) 
                        && (item.color_spa.filter(e=>search.includes(e)).length || item.brand.filter(e=>search.includes(e)).length || item.style.filter(e=>search.includes(e)).length || search==="")))
                    setFilteredData(dataFiltered);
                }
        }, [props.productsDto, props.wordEntered, props.filters]);          

        return (
            <ContainerProducts>
                    {  filteredData.length      
                    ? filteredData.map((value) => (            
                            <Product value={value} key={value.id} /> ))                    
                    : <div style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", height: 300, justifyContent:"center"}}>
                            <RemoveShoppingCart style={{fontSize: 150, color: "Lavender"}}/><h3 style={{color: "SlateGray"}}> 0 resultados</h3><h5 style={{color: "silver"}}>No hay productos para mostrar ahora mismo</h5></div>
                    }
            </ContainerProducts>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  products: state.home.products,
  productsDto: state.home.productsDto,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(homeActions.loadProducts()),
  loadProductsDto: () => dispatch(homeActions.loadProductsDto()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
