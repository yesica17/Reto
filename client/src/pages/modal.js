import { Drawer, Modal,ButtonToolbar, Button,IconButton} from 'rsuite';
import { useState, useEffect, Fragment } from "react";
import 'rsuite/dist/styles/rsuite-default.css';


const Prueba = () => {
  const [open, setOpen] = useState(false);

  
  return (
    <Fragment>
      <Button onClick={()=>setOpen(true)}>Pinoccio</Button>

      <Drawer placement='right' show={open} onHide={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          dfhgiudsfbgidfgbidufh
        </Drawer.Body>
      </Drawer>
    </Fragment>
  );
};

export default Prueba