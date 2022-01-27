import {FormLogin, InputLogin} from "../components/Styled_components";
import { Modal, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Order from "./Order";

import { connect } from "react-redux";

import * as contactActions from "../store/actions/contact";
import * as cartActions from "../store/actions/cart";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = (props) => {
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
        <Modal.Header>
          <Modal.Title>Dirección de contacto</Modal.Title>
        </Modal.Header>  
      
        <FormLogin>
          <InputLogin
            placeholder="Departamento"
            onChange={(value) =>
              setContact({ ...contact, state: value.target.value })
            }
          />
          <InputLogin
            placeholder="Ciudad"
            onChange={(value) =>
              setContact({ ...contact, city: value.target.value })
            }
          />
          <InputLogin
            placeholder="Dirección"
            onChange={(value) =>
              setContact({ ...contact, adress: value.target.value })
            }
          />
          <div>
                             
            <Button  color= "blue" appearance="ghost" 
              onClick={async () => {
                props.cart.map(value=> props.updateAmount(value.id));
                await props.createContact(contact);
                await setOpenModal(true)
                
              }}
            >
              Siguiente
            </Button>          
          {" "}{" "}
          <Button onClick={() => props.setOpen(false)} appearance="subtle">
            <b>Cancelar</b>
          </Button>
          </div>
        </FormLogin>
      
    </Modal>
    <Order open={openModal} setOpen={setOpenModal}></Order>
    </div>
  );
};

//leer estados
const mapStateToProps = (state) => ({cart: state.cart.cart,});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  createContact: (payload) => dispatch(contactActions.createContact(payload)),
  loadCart: () => dispatch(cartActions.loadCart()), 
  updateAmount: (payload) => dispatch(contactActions.updateAmount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
