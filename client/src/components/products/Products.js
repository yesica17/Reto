import Product from "../product/Product";
import { ContainerProducts } from "./style";
import { RemoveShoppingCart, NavigateNext} from "@material-ui/icons";
import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as homeActions from "../../store/actions/home";
import "./pagination.css";
import ReactPaginate from "react-paginate";

const Products = (props) => {
   
        const [filteredData, setFilteredData] = useState([]); 
        const [pageNumber, setPageNumber] = useState(0);

        const productsPerPage = 3;
        const pagesVisited = pageNumber * productsPerPage;        
        
        useEffect(() => {            
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
                        && (item.color_spa.filter(value =>value.indexOf(search) !== -1).length || item.brand.filter(value =>value.indexOf(search) !== -1).length || item.style.filter(value =>value.indexOf(search) !== -1).length || search==="")))
                    setFilteredData(dataFiltered);
                }
        }, [props.productsDto, props.wordEntered, props.filters]);         
        
        const pageCount = Math.ceil(filteredData.length / productsPerPage)

        const changePage = ({ selected }) =>{
            setPageNumber(selected);
        };

        return (
            <div>
            <ContainerProducts>
                    {  filteredData.length      
                    ? filteredData.slice(pagesVisited, pagesVisited + productsPerPage).map((value) => (            
                            <Product value={value} key={value.id} /> ))                    
                    : <div style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", height: 300, justifyContent:"center"}}>
                            <RemoveShoppingCart style={{fontSize: 150, color: "Lavender"}}/><h3 style={{color: "SlateGray"}}> 0 resultados</h3><h5 style={{color: "silver"}}>No hay productos para mostrar ahora mismo</h5></div>
                    }                                              
            </ContainerProducts>
            <ReactPaginate
                        previousLabel = {"Anterior"}
                        nextLabel = {"Siguiente"}
                        pageCount = {pageCount}
                        onPageChange = {changePage}
                        pageRangeDisplayed={5}
                        containerClassName = {"paginationBttns"}
                        previousLinkClassName = {"previousBttn"}
                        nextLinkClassName = {"nextBttn"}
                        disabledClassName = {"paginationDisabled"}
                        activeClassName = {"paginationActive"}                
                />  
            </div>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  products: state.home.products,
  productsDto: state.home.productsDto,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({  
  loadProductsDto: () => dispatch(homeActions.loadProductsDto()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
