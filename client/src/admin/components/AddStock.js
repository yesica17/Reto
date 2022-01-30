import { Modal, SelectPicker, InputNumber, Whisper, Tooltip, Table, Alert, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { FormRegister, InputRegister, AgreementRegister, ButtonRegister } from "../components/Styled_components";

import { connect } from "react-redux";
import * as optionsActions from "../../store/actions/options";
import * as productActions from "../../store/actions/product";
import { useState, useEffect } from "react";

import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import {Help, Delete, Edit, ArrowBack} from "@material-ui/icons";
import UpdateStock from './UpdateStock';

const { Column, HeaderCell, Cell, Pagination } = Table;

const AddStock = (props) => {

     useEffect(() => {  
    props.loadStockDto();  
    props.loadColor();
    props.loadSize();   
  }, []);  

  const newStock = props.stockDto;

  const stock_init = {
    available_quantity: null,    
    size:{
        id : null
    },
    color:{
        id: null   
    },
    product :{
        id: null
    }
}

const [stock, setStock] = useState(stock_init);
const [open, setOpen] = useState(false);
const [rowData, setRowData] = useState({});  

  return (
    <div>
    <Modal  onEnter={()=>{setStock({...stock, product: { id: props.rowData.id_product}})}} size= "lg" show={props.open} overflow={true} onHide={() => props.setOpen(false)} onExit={async()=>await props. loadStockDto()}>  
        <Modal.Header>
          <Modal.Title><div style={{display: "flex", flexDirection: "row"}}><ArrowBack onClick={()=>props.setOpen(false)}/><div style={{marginLeft: 20}}><h5>Crear inventario</h5></div></div></Modal.Title>
        </Modal.Header>  
        <ModalBody style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{padding: 5}}>
            <SelectPicker
                                style={{width: 200}}
                                data={props.colors}
                                labelKey="color_spa"
                                valueKey="id"
                                size="md"
                                cleanable={false}
                                searchable={false}
                                placeholder="Elige un color"
                                onSelect={async (value) => {
                                        setStock({
                                        ...stock,
                                        color: { id: value },
                                        });
                                }}  /></div>
            <div style={{padding: 5}}>
            <SelectPicker
                                style={{width: 200}}
                                data={props.sizes}
                                labelKey="size"
                                valueKey="id"
                                size="md"
                                cleanable={false}
                                searchable={false}
                                placeholder="Elige una talla"
                                onSelect={async (value) => {
                                        setStock({
                                        ...stock,
                                        size: { id: value },
                                        });
                                }} /></div>
                    <div style={{padding: 5}}>
                    <InputNumber  style={{width: 200}} size= "md" prefix="#"  min={0}   onChange={(value) => setStock({ ...stock, available_quantity: value})
                    }/></div>
                    <Whisper
                        trigger="hover"
                        placement= "rightTop"
                        speaker={
                    <Tooltip>Escriba la cantidad disponible</Tooltip>}><Help/></Whisper>

                    <div style={{marginLeft: 100}}><Button style={{background: "DodgerBlue", color: "white", boxShadow: "3px 3px 3px gray"}} onClick={async()=>{if(stock.size.id !== null && stock.color.id !== null && stock.available_quantity !== null){
                await props.createStock(stock); 
                await props.loadStockDto();
                } else {Alert.warning("Todos los campos son requeridos")}}}><b>Agregar al inventario</b></Button>
                </div> 


            </div>
             
            <Table
          height={400}        
          data={newStock.filter(value=>value.id_product === props.rowData.id_product)}  
          sortType='asc'         
        //   onRowClick={data => {
        //     console.log(data);
        //   }}
        >
          <Column width={70} align="center" resizable>
            <HeaderCell><h5><b>Ref.</b></h5></HeaderCell>
            <Cell dataKey="id_stock" />
          </Column>         

          <Column width={200} align="center" resizable>
            <HeaderCell><h5><b>Color</b></h5></HeaderCell>
            <Cell dataKey="color_spa" />
          </Column>

          <Column width={70} align="center" resizable>
            <HeaderCell><h5><b>Talla</b></h5></HeaderCell>
            <Cell dataKey="size" />
          </Column>

          <Column width={200} align="center" resizable>
            <HeaderCell><h5><b>Cantidad disponible</b></h5></HeaderCell>
            <Cell dataKey="available_quantity" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell></HeaderCell>
            <Cell>
              {rowData => {
                function handleAction() {
                  console.log(rowData);
                }
                return (
                  <span>
                    <a onClick={()=>{setRowData(rowData); setOpen(true)}}> <Edit style={{color: "LightSlateGray", fontSize: 20, cursor: "pointer"}}/> </a> |{' '}
                    <a onClick={async()=>{await props.deleteStock(rowData.id_stock); await props. loadStockDto()}}> <Delete style={{color: "Tomato", fontSize: 20, cursor: "pointer"}}/></a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>

        </ModalBody>
        <ModalFooter></ModalFooter>      
    </Modal>   
    <UpdateStock open={open} setOpen={setOpen} rowData={rowData}/> 
    </div>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  stockDto: state.product.stockDto,
  colors: state.options.colors,
  sizes: state.options.sizes,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadStockDto: () => dispatch(productActions.loadStockDto()),
  loadColor: () => dispatch(optionsActions.loadColor()),
  loadSize: () => dispatch(optionsActions.loadSize()),   
  createStock: (payload) => dispatch(productActions.createStock(payload)), 
  deleteStock: (payload) => dispatch(productActions.deleteStock (payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStock);
