import { Modal, Button, SelectPicker, InputNumber, Whisper, Tooltip, Table} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { connect } from "react-redux";
import * as optionsActions from "../../store/actions/options";
import * as productActions from "../../store/actions/product";
import { useState, useEffect } from "react";

import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import {Help, Delete, Edit} from "@material-ui/icons";

const { Column, HeaderCell, Cell, Pagination } = Table;

const AddStock = (props) => {

     useEffect(() => {  
    props.loadStockDto();  
    props.loadColor();
    props.loadSize();   
  }, []);  

  const newStock= props.stockDto;

  return (
    <div>
    <Modal size= "lg" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
        <Modal.Header>
          <Modal.Title><h5>Crear inventario</h5></Modal.Title>
        </Modal.Header>  
        <ModalBody style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{padding: 5}}>
            <SelectPicker
                                style={{width: 250}}
                                data={props.colors}
                                labelKey="color_spa"
                                valueKey="id"
                                size="md"
                                searchable={false}
                                placeholder="Elige un color"
                                /></div>
            <div style={{padding: 5}}>
            <SelectPicker
                                style={{width: 250}}
                                data={props.sizes}
                                labelKey="size"
                                valueKey="id"
                                size="md"
                                searchable={false}
                                placeholder="Elige una talla"
                                /></div>
                    <div style={{padding: 5}}>
                    <InputNumber  size= "md" prefix="#" defaultValue={0} min={0}/></div>
                    <Whisper
                        trigger="hover"
                        placement= "rightTop"
                        speaker={
                    <Tooltip>Escriba la cantidad disponible</Tooltip>}><Help/></Whisper>
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
                    <a onClick={handleAction}> <Edit style={{color: "LightSlateGray", fontSize: 20}}/> </a> |{' '}
                    <a onClick={handleAction}> <Delete style={{color: "Tomato", fontSize: 20}}/></a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>

        </ModalBody>
        <ModalFooter></ModalFooter>      
    </Modal>    
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStock);
