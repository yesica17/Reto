import { Modal, SelectPicker, InputNumber, Whisper, Tooltip, Table, Alert, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { connect } from "react-redux";
import * as optionsActions from "../../store/actions/options";
import * as productActions from "../../store/actions/product";
import { useState, useEffect, Fragment } from "react";

import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import {Help, Delete, Edit, ArrowBack} from "@material-ui/icons";
import UpdateStock from './UpdateStock';
import ModalDelete from './ModalDelete';

const { Column, HeaderCell, Cell, Pagination } = Table;


const DetailStock = (props) => {   
const [open, setOpen] = useState(false);
const [rowData, setRowData] = useState({});  
const [openDel, setOpenDel] = useState(false);

const newStock = props.stockDto;

console.log("row data", props.rowData)
  
  return (
      <Fragment>
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
                    <a onClick={()=>{setRowData(rowData); setOpenDel(true)}}> <Delete style={{color: "Tomato", fontSize: 20, cursor: "pointer"}}/></a>
                  </span>
                );
              }}
            </Cell>
          </Column>
        </Table>
        <UpdateStock open={open} setOpen={setOpen} rowData={rowData}/> 
    <ModalDelete openDel={openDel} setOpenDel={setOpenDel} rowData={rowData}/> 

    </Fragment>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  stockDto: state.product.stockDto, 
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadStockDto: () => dispatch(productActions.loadStockDto()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailStock);