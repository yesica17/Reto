import { Drawer, Modal,ButtonToolbar, Button,IconButton} from 'rsuite';
import { useState, useEffect, Fragment } from "react";
import 'rsuite/dist/styles/rsuite-default.css';


const Prueba = (props) => {
  

  
  return (
      

      <Modal show={props.open} onHide={() => props.setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Drawer Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          dfhgiudsfbgidfgbidufh
        </Modal.Body>
      </Modal>
    
  );
};

export default Prueba