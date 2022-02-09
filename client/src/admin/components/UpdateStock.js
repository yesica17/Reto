import { Modal, InputNumber, Whisper, Tooltip, Alert, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { connect } from "react-redux";
import * as optionsActions from "../../store/actions/options";
import * as productActions from "../../store/actions/product";
import { useState, useEffect } from "react";

import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import {Help} from "@material-ui/icons";

const UpdateStock = (props) => {

        useEffect(() => {  
            props.loadStockDto();  
            props.loadColor();
            props.loadSize();   
        }, []);    

        const stock_init = {
            id: null,
            available_quantity: null,   
        }

        const [stock, setStock] = useState(stock_init);

        return (
            <div>
                <Modal onEnter={()=>{setStock({...stock, id: props.rowData.id_stock})}} size= "sm" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
                    <Modal.Header> <Modal.Title><h5>Actualizar inventario</h5></Modal.Title> </Modal.Header>  
                    <ModalBody style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>            
                                <div style={{padding: 5}}>
                                <InputNumber  size= "md" prefix="#" min={0}   onChange={(value) => setStock({ ...stock, available_quantity: value})}/>
                                </div>
                                <Whisper trigger="hover" placement= "rightTop"
                                    speaker={<Tooltip>Escriba la cantidad disponible</Tooltip>}><Help/>
                                </Whisper>
                                <div style={{marginLeft: 100}}><Button Button style={{background: "DodgerBlue", color: "white", boxShadow: "3px 3px 3px gray"}} onClick={async()=>{if( stock.available_quantity !== null){
                                        await props.updateStock(stock); 
                                        await props.loadStockDto();
                                        props.setOpen(false);
                                        } else {Alert.warning("Todos los campos son requeridos")}}}><b>Actualizar</b></Button></div>
                        </div>                                
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
  updateStock: (payload) => dispatch(productActions.updateStock (payload)), 
  
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStock);