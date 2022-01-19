import styled from "styled-components";
import { CheckPicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { mobile } from "../responsive";
import { useState, useEffect} from "react";

import { connect } from "react-redux";

import * as optionsActions from "../store/actions/options";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = (props) => {

  const filters_init={
    color:[],
    size:[],
    category:"",
    brand:[],
    
  }
  
  const [filters, setFilters] = useState(filters_init); 

   useEffect(() => {    
    props.loadColor();
    props.loadSize();
    props.loadBrand();
    props.loadStyle();
    props.loadCategory();
    
  }, []);

  console.log(filters)

  return (
    <Container>            
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar Productos:</FilterText>          
              <CheckPicker                                    
                  style={{width: 150}}
                  data={props.colors}
                  labelKey="color"
                  valueKey="id"
                  size="sm"
                  searchable={false}
                  placeholder="Color"
                  onChange={ value => { setFilters({ ...filters, color: value }) }} />  {" "}

                  <CheckPicker                                    
                  style={{width: 150}}
                  data={props.sizes}
                  labelKey="size"
                  valueKey="id"
                  size="sm"
                  searchable={false}
                  placeholder="Talla"
                  onChange={ value => { setFilters({ ...filters, size: value }) }} />    {" "}

                  <CheckPicker                                    
                  style={{width: 150}}
                  data={props.brands}
                  labelKey="name"
                  valueKey="id"
                  size="sm"
                  searchable={false}
                  placeholder="Marca"
                  onChange={ value => { setFilters({ ...filters, brand: value }) }} />            
        </Filter>        
      </FilterContainer>      
    </Container>
  );
};

//leer estados
const mapStateToProps = (state) => ({  
  colors: state.options.colors,
  sizes: state.options.sizes,
  brands: state.options.brands,
  styles: state.options.styles,
  categories: state.options.categories,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadColor: () => dispatch(optionsActions.loadColor()),
  loadSize: () => dispatch(optionsActions.loadSize()),  
  loadBrand: () => dispatch(optionsActions.loadBrand()),  
  loadStyle: () => dispatch(optionsActions.loadStyle()),  
  loadCategory: () => dispatch(optionsActions.loadCategory()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);