import { Modal } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { useHistory  } from "react-router-dom";
import ModalBody from "rsuite/lib/Modal/ModalBody";
import ModalFooter from "rsuite/lib/Modal/ModalFooter";
import Order from "../order/Order";
import { useState } from "react";

const AlertOrder = (props) => {  
    const history=useHistory();
    const [openModal, setOpenModal] = useState(false); 

        return (
            <div>
                <Modal  size = "xs" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
                    <Modal.Header> <Modal.Title>Notificación</Modal.Title> </Modal.Header>
                    <ModalBody>
                        <p>Lo sentimos. Alguno(s)  de los productos seleccionados ya no se encuentran disponibles</p>                        
                    </ModalBody> 
                    <ModalFooter>                                          
                            <button onClick={()=>{props.setOpen(false); setOpenModal(false)}} style={{color: "black", background: "transparent", fontSize: 14, textDecorationLine: "none", borderWidth: 1, borderStyle:"solid", borderColor: "black", borderRadius: 5, padding: 5}}>
                                <b>Aceptar</b>
                            </button>                                                                    
                    </ModalFooter>   
                    <Order open={openModal} setOpen={setOpenModal}></Order>                                                 
                </Modal>                
            </div>
        );
};

export default AlertOrder;