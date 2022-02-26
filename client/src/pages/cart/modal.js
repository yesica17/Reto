import { Modal } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import ModalBody from "rsuite/lib/Modal/ModalBody";
import ModalFooter from "rsuite/lib/Modal/ModalFooter";
import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as contactActions from "../../store/actions/contact";
import Contact from "../contact/Contact";

let stateCart = [];

const Notification = (props) => {    

        useEffect(() => {            
            props.loadCart();                      
        }, []);  

        useEffect(() => {                  
            stateCart=props.cart.filter( value=>value.req_quantity > value.stocks.available_quantity);                  
         }, [props.cart]);    

        const [openModal, setOpenModal] = useState(false);    
        

        return (
            <div>
                <Modal  size = "xs" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
                    <Modal.Header> <Modal.Title>Notificación</Modal.Title> </Modal.Header>
                    <ModalBody>
                        <p>Lo sentimos. Alguno(s) de los productos seleccionados ya no se encuentran disponibles</p>                        
                    </ModalBody> 
                    <ModalFooter style={{display: "flex", flexDirection: "row"}}>
                        <div style={{marginRight: 15}}>                         
                            <button onClick={()=>props.setOpen(false)} style={{color: "black", background: "transparent", fontSize: 14, textDecorationLine: "none", borderWidth: 1, borderStyle:"solid", borderColor: "black", borderRadius: 5, padding: 5}}>
                                <b>Ver Carrito</b>
                            </button>   
                        </div>        
                            <button onClick={async ()=>{                                
                                await props.cart.map(async value=> await props.updateAmount(value.id));                  
                                await stateCart.map(async value=> await props.updateStateCart(value.id));                                                                  
                                setOpenModal(true); 
                                props.setOpen(false);
                            }} style={{color: "black", background: "transparent", fontSize: 14, textDecorationLine: "none", borderWidth: 1, borderStyle:"solid", borderColor: "black", borderRadius: 5, padding: 5}}>
                                <b>Continuar con la compra</b>
                            </button>                                                           
                    </ModalFooter>   
                    <Contact open={openModal} setOpen={setOpenModal}></Contact>                                                     
                </Modal>                
            </div>
        );
};

//leer estados
const mapStateToProps = (state) => ({
    cart: state.cart.cart,      
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({    
    updateStateCart: (payload) => dispatch(cartActions.updateStateCart(payload)),  
    updateAmount: (payload) => dispatch(contactActions.updateAmount(payload)),
    loadCart: () => dispatch(cartActions.loadCart()),   
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

