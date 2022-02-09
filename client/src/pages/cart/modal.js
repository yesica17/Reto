import { Modal } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Link } from "react-router-dom";
import ModalBody from "rsuite/lib/Modal/ModalBody";
import ModalFooter from "rsuite/lib/Modal/ModalFooter";


const Notification = (props) => {       

        return (
            <div>
                <Modal  size = "xs" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
                    <Modal.Header> <Modal.Title>Notificación</Modal.Title> </Modal.Header>
                    <ModalBody>
                        <p>Lo sentimos. Los productos seleccionados ya no se encuentran disponibles</p>                        
                    </ModalBody> 
                    <ModalFooter>                        
                        <Link to="/">
                                    <button style={{color: "black", background: "transparent", fontSize: 14, textDecorationLine: "none", borderWidth: 1, borderStyle:"solid", borderColor: "black", borderRadius: 5, padding: 5}}>
                                        <b>Continuar Comprando</b>
                                    </button>
                        </Link>                      
                    </ModalFooter>                                                    
                </Modal>                
            </div>
        );
};

export default Notification;

