import { Modal, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import ModalBody from "rsuite/lib/Modal/ModalBody";
import ModalFooter from "rsuite/lib/Modal/ModalFooter";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as productActions from "../../store/actions/product";

const ModalDelete = (props) => {   

        const [stock, setStock] = useState(null);

        useEffect(() => {  
            props.loadStockDto();      
        }, []);  

        return (
            <Modal show={props.openDel} overflow={true} onHide={() => props.setOpenDel(false)} onEnter={()=>setStock(props.rowData.id_stock)} onExit={async()=> await props.loadStockDto()}>  
                <Modal.Header> <Modal.Title>Eliminar producto</Modal.Title> </Modal.Header>
                <ModalBody>¿Estas seguro que quieres eliminar este producto?</ModalBody>
                <ModalFooter>
                    <Button onClick={async()=>{ await props.deleteStock(stock); props.setOpenDel(false)}}>Eliminar</Button>
                    <Button>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
};

//leer estados
const mapStateToProps = (state) => ({
  stockDto: state.product.stockDto,  
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadStockDto: () => dispatch(productActions.loadStockDto()), 
  deleteStock: (payload) => dispatch(productActions.deleteStock (payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);