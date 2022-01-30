import { Table, SelectPicker, InputNumber, InputGroup, Input, Icon,  Tooltip, Whisper, IconButton } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Navigation from "../components/Navigation";
import { FormRegister, InputRegister, AgreementRegister, ButtonRegister } from "../components/Styled_components";
import {AddBox, Delete, Help} from "@material-ui/icons";

import { connect } from "react-redux";
import * as homeActions from "../../store/actions/home";
import * as optionsActions from "../../store/actions/options";
import { useState, useEffect } from "react";
import AddStock from '../components/AddStock';

const { Column, HeaderCell, Cell, Pagination } = Table;


const AddProducts = (props)=>{

    const [open, setOpen] = useState(false);   
    const [rowData, setRowData] = useState({});     

    useEffect(() => {        
        props.loadProductsDto();
        props.loadBrand();
        props.loadStyle();
        props.loadCategory();
    }, []);     

    let newProducts= props.productsDto;

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
                                searchable={false}
                                placeholder="Elige la categoría"
                                />

            <SelectPicker
                                style={{width: 250}}
                                data={props.styles}
                                labelKey="name"
                                valueKey="id"
                                size="md"
                                searchable={false}
                                placeholder="Elige el estilo"
                                />
                
            <SelectPicker
                                style={{width: 250}}
                                data={props.brands}
                                labelKey="name"
                                valueKey="id"
                                size="md"
                                searchable={false}
                                placeholder="Elige la marca"
                                />

            <InputNumber  size= "md" prefix="$" defaultValue={0} min={0}/>
            </div><div style={{width: 200}}></div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
            <InputGroup>
                <InputGroup.Addon>
                    <Icon icon="image" />
                </InputGroup.Addon>
                <Input />
            </InputGroup>
            <Whisper
                trigger="hover"
                placement= "rightTop"
                speaker={
            <Tooltip>Introduzca la url de la imagen</Tooltip>}><Help/></Whisper>
            </div>
            <Input size = "md" componentClass="textarea" rows={8} style={{ width: 300 }} placeholder="Escriba la descripción del producto" />   
            </div>
        </FormRegister>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}><ButtonRegister>Agregar producto</ButtonRegister></div>        
        <Table
          height={400}        
          data={newProducts}  
          sortType='asc'
        //   onRowClick={data => {
        //     console.log(data);
        //   }}
        >
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
                    <a onClick={()=>{setRowData(rowData); setOpen(true)}}> <AddBox style={{color: "SpringGreen"}}/> </a> |{' '}
                    <a onClick={handleAction}> <Delete style={{color: "Tomato"}}/></a>
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
  productsDto: state.home.productsDto,
  brands: state.options.brands,
  styles: state.options.styles,
  categories: state.options.categories, 
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({  
  loadProductsDto: () => dispatch(homeActions.loadProductsDto()),
  loadBrand: () => dispatch(optionsActions.loadBrand()),  
  loadStyle: () => dispatch(optionsActions.loadStyle()),  
  loadCategory: () => dispatch(optionsActions.loadCategory()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
