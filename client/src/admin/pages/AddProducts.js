import { Table, SelectPicker, InputNumber, InputGroup, Input, Icon,  Tooltip, Whisper, Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Navigation from "../components/Navigation";
import { FormRegister, ButtonRegister } from "../components/Styled_components";
import {AddBox, Delete, Help} from "@material-ui/icons";

import { connect } from "react-redux";
import * as homeActions from "../../store/actions/home";
import * as optionsActions from "../../store/actions/options";
import * as productActions from "../../store/actions/product";
import { useState, useEffect } from "react";
import AddStock from '../components/AddStock';

const { Column, HeaderCell, Cell, Pagination } = Table;


const AddProducts = (props)=>{

    const product_init = {
    desc: "",
    img: "",
    price: null,    
    categories: [{
        id: null    
    }],
    styles: [{
        id: null   
    }],
    brands: [{
        id: null  
    }]
    }

    const [open, setOpen] = useState(false);   
    const [rowData, setRowData] = useState({});  
    const [product, setProduct] = useState(product_init);     

    useEffect(() => {        
        props.loadProductsDtoAdmin();
        props.loadBrand();
        props.loadStyle();
        props.loadCategory();
    }, []);     

    const newProducts= props.productsDtoAdmin;    

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return(
        <div style={{display:"flex", flexDirection: "column"}}>
            <div style={{display:"flex", flexDirection: "row"}}>
            <Navigation/>
            <FormRegister onSubmit={handleSubmit}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                <SelectPicker
                                    style={{width: 250}}
                                    data={props.categories}
                                    labelKey="name"
                                    valueKey="id"
                                    size="md"
                                    cleanable= {false}
                                    searchable={false}
                                    placeholder="Elige la categoría"
                                    onSelect={async (value) => {
                                            setProduct({ ...product, categories: [{ id: value }],});}}/>
                <SelectPicker
                                    style={{width: 250}}
                                    data={props.styles}
                                    labelKey="name"
                                    valueKey="id"
                                    size="md"
                                    cleanable= {false}
                                    searchable={false}
                                    placeholder="Elige el estilo"
                                    onSelect={async (value) => {
                                        setProduct({ ...product, styles: [{ id: value }],}); }}/>                    
                <SelectPicker
                                    style={{width: 250}}
                                    data={props.brands}
                                    labelKey="name"
                                    valueKey="id"
                                    size="md"
                                    cleanable= {false}
                                    searchable={false}
                                    placeholder="Elige la marca"
                                    onSelect={async (value) => {
                                        setProduct({ ...product, brands: [{ id: value }],});}}/>

                <InputNumber  size= "md" prefix="$"  min={0} onChange={(value) => setProduct({ ...product, price: value}) }/>
                </div>
                <div style={{width: 200}}></div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                <InputGroup>
                    <InputGroup.Addon>
                        <Icon icon="image" />
                    </InputGroup.Addon>
                    <Input onChange={(value) => setProduct({ ...product, img: value})}/>
                </InputGroup>
                <Whisper
                    trigger="hover"
                    placement= "rightTop"
                    speaker={
                <Tooltip>Introduzca la url de la imagen</Tooltip>}><Help/></Whisper>
                </div>
                <Input size = "md" componentClass="textarea" rows={8} style={{ width: 300 }} placeholder="Escriba la descripción del producto" 
                onChange={(value) => setProduct({ ...product, desc: value})}/>   
                </div>
            </FormRegister>
            </div>
                <div style={{display: "flex", justifyContent: "center"}}><ButtonRegister onClick={async()=>{if(product.desc !== "" && product.img !== "" && product.price !== null && product.categories[0].id !== null && product.styles[0].id !== null && product.brands[0].id !== null){
                        await props.createProduct(product); 
                        await props.loadProductsDtoAdmin();
                        } else {Alert.warning("Todos los campos son requeridos")}}}>Agregar producto</ButtonRegister></div>        
            <Table height={400} data={newProducts} sortType='asc'>
            <Column width={70} align="center" resizable>
                <HeaderCell><h5><b>Id</b></h5></HeaderCell>
                <Cell dataKey="id_product" />
            </Column>

            <Column width={300} align="center" resizable>
                <HeaderCell><h5><b>Descripción</b></h5></HeaderCell>
                <Cell dataKey="desc" />
            </Column>

            <Column width={100} align="center" resizable>
                <HeaderCell><h5><b>Precio</b></h5></HeaderCell>
                <Cell dataKey="price" />
            </Column>

            <Column width={100} align="center" resizable>
                <HeaderCell><h5><b>Categoría</b></h5></HeaderCell>
                <Cell dataKey="category" />
            </Column>

            <Column width={200} align="center" resizable>
                <HeaderCell><h5><b>Estilo</b></h5></HeaderCell>
                <Cell dataKey="style" />
            </Column>

            <Column width={200} align="center" resizable>
                <HeaderCell><h5><b>Marca</b></h5></HeaderCell>
                <Cell dataKey="brand" />
            </Column>                  

            <Column width={120} fixed="right">
                <HeaderCell></HeaderCell>
                <Cell>
                {rowData => {
                    function handleAction() {
                    
                    }
                    return (
                    <span>
                        <a onClick={()=>{setRowData(rowData); setOpen(true)}}> <AddBox style={{color: "SpringGreen", cursor: "pointer"}}/> </a> |{' '}
                        <a onClick={async()=>{await props.updateProductStatus(rowData.id_product); await props.loadProductsDto()}}> <Delete style={{color: "Tomato", cursor: "pointer"}}/></a>
                    </span>
                    );
                }}
                </Cell>
            </Column>          
            </Table>
            <AddStock open={open} setOpen={setOpen} rowData={rowData}></AddStock>  
      </div>

    );
  };

  //leer estados
const mapStateToProps = (state) => ({  
  productsDtoAdmin: state.product.productDtoAdmin,
  brands: state.options.brands,
  styles: state.options.styles,
  categories: state.options.categories, 
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({  
  loadProductsDtoAdmin: () => dispatch(productActions.loadProductsDtoAdmin()),
  loadBrand: () => dispatch(optionsActions.loadBrand()),  
  loadStyle: () => dispatch(optionsActions.loadStyle()),  
  loadCategory: () => dispatch(optionsActions.loadCategory()),  
  createProduct: (payload) => dispatch(productActions.createProduct(payload)), 
  updateProductStatus: (payload) => dispatch(productActions.updateProductStatus(payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
