import {FormLogin, InputLogin} from "./style";
import { Modal, Button, Alert} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Order from "../order/Order";

import { connect } from "react-redux";

import * as contactActions from "../../store/actions/contact";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";
import { useState, useEffect } from "react";


const Contact = (props) => {

        useEffect(() => {        
            props.loadCart();    
        }, []);   

        const contactInit = {
            state: "",
            city: "",
            adress: "",
        };
        const [contact, setContact] = useState(contactInit);  
        const [openModal, setOpenModal] = useState(false); 

        return (
            <div>
                <Modal show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
                    <Modal.Header> <Modal.Title>Dirección de contacto</Modal.Title> </Modal.Header>                 
                    <FormLogin>
                        <InputLogin  placeholder="Departamento" 
                            onChange={(value) => setContact({ ...contact, state: value.target.value })} />
                        <InputLogin placeholder="Ciudad"            
                            onChange={(value) => setContact({ ...contact, city: value.target.value })}/>
                        <InputLogin placeholder="Dirección"
                            onChange={(value) => setContact({ ...contact, adress: value.target.value })}/>
                    <div>
                                        
                        <Button  color= "blue" appearance="ghost" 
                            onClick={async () => { 
                            if(contact.state !== "" && contact.city !== "" && contact.adress !== "")
                                { await props.createContact(contact);  
                                await props.loadContact();  
                                await props.getAmount();                        
                                await props.loadCart();              
                                await setOpenModal(true);   
                                await props.setOpen(false); 
                                }else{
                                    Alert.warning("Todos los campos son requeridos")
                                }          
                            }}> Siguiente </Button> {" "}{" "}
                        <Button onClick={() => props.setOpen(false)} appearance="subtle"> <b>Cancelar</b> </Button>
                    </div>
                    </FormLogin>                
                </Modal>
                <Order open={openModal} setOpen={setOpenModal} contact={contact}></Order>
            </div>
        );
};

//leer estados
const mapStateToProps = (state) => ({cart: state.cart.cart,  user: state.login.user});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  createContact: (payload) => dispatch(contactActions.createContact(payload)),  
  loadCart: () => dispatch(cartActions.loadCart()), 
  loadContact: () => dispatch(contactActions.loadContact()),
  getAmount: () => dispatch(orderActions.getAmount()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
