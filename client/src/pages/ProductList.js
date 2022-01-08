import styled from "styled-components";
import { FilterColor, FilterColorOption, FilterSize, FilterSizeOption} from "../components/Styled_components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
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
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

   useEffect(() => {    
    props.loadColor();
    props.loadSize();
    props.loadBrand();
    props.loadStyle();
    props.loadCategory();
  }, []);
 
//console.log(filters)

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar Productos:</FilterText>

          <FilterColor name="category"  onClick={handleFilters}>
                  {props.categories.length
                    ? props.categories.map((value) => (
                        <FilterColorOption value={value.id} key={value.id}>
                          {value.name}
                        </FilterColorOption>
                      ))
                    : null}
            </FilterColor>

           <FilterColor name="color"  onClick={handleFilters}>
                  {props.colors.length
                    ? props.colors.map((value) => (
                        <FilterColorOption value={value.id} key={value.id}>
                          {value.color}
                        </FilterColorOption>
                      ))
                    : null}
            </FilterColor>

            <FilterColor name="size"  onClick={handleFilters}>
                  {props.sizes.length
                    ? props.sizes.map((value) => (
                        <FilterColorOption value={value.id} key={value.id}>
                          {value.size}
                        </FilterColorOption>
                      ))
                    : null}
            </FilterColor>

            <FilterColor name="brand"  onClick={handleFilters}>
                  {props.brands.length
                    ? props.brands.map((value) => (
                        <FilterColorOption value={value.id} key={value.id}>
                          {value.name}
                        </FilterColorOption>
                      ))
                    : null}
            </FilterColor>

            

            
          
          
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters}/>      
      <Footer />
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