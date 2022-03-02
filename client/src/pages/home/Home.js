import Navbar from "../../components/navbar/Navbar";
import Announcement from "../../components/announcement/Announcement";
import Slider from "../../components/slider/Slider";
import Products from "../../components/products/Products";
import PopularProducts from "../../components/popular_product/PopularProducts";
import Footer from "../../components/footer/Footer";
import { SearchContainerNavbar, InputNavbar, LeftNavbar, WrapperNavbar, Container, FilterContainer, Filter, FilterText } from "./style";
import { Search} from "@material-ui/icons";
import { CheckPicker, Pagination } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';



import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as optionsActions from "../../store/actions/options";



const Home = (props) => {
        const [wordEntered, setWordEntered] = useState("");
            const filters_init={
            color:[],
            size:[],
            category:[],
            brand:[],
            
        }  
        const [filters, setFilters] = useState(filters_init);   
        const [activePage, setActivePage] = useState(1);
       

        useEffect(() => {    
            props.loadColor();
            props.loadSize();
            props.loadBrand();
            props.loadStyle();
            props.loadCategory();            
        }, []);

        const handleWord = (e) => {
            const value = e.target.value;
            setWordEntered({ ...wordEntered, [e.target.name]: value });
        }; 

        return (
            <Fragment>      
                <Navbar />  
                <Announcement />    
                <Slider />                
                <WrapperNavbar>
                        <LeftNavbar>
                        <SearchContainerNavbar>
                            <InputNavbar placeholder="Búsqueda"  name="search"  onChange={handleWord}/>
                            <Search style={{ color: "gray", fontSize: 16 }} />         
                        </SearchContainerNavbar>  
                        </LeftNavbar>
                </WrapperNavbar>
                <Container>                    
                        <FilterContainer>
                            <Filter>
                            <FilterText>Filtrar Productos:</FilterText>
                                <CheckPicker                                    
                                    style={{width: 150}}
                                    data={props.categories}
                                    labelKey="name"
                                    valueKey="id"
                                    size="sm"
                                    searchable={false}
                                    placeholder="Género"
                                    onChange={ value => { setFilters({ ...filters, category: value }) }} />  {" "}          

                                <CheckPicker                                    
                                    style={{width: 150}}
                                    data={props.colors}
                                    labelKey="color_spa"
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
                <Products wordEntered={wordEntered} filters={filters}/>               
                <div style={{textAlign: "center"}}><h3 ><b>Los más buscados</b></h3></div>
                <PopularProducts/>                      
                <Footer />
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
