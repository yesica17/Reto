import {Edit, Delete, RemoveRedEye} from "@material-ui/icons";
import { Modal, Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';

import { InfoProduct, ContainerProduct, ImageProduct, IconProduct } from "./Styled_components";
import { useState } from "react";
import DetailProduct from "./DetailProduct";


import { connect } from "react-redux";
import * as productActions from "../../store/actions/product";
import * as homeActions from "../../store/actions/home";
import UpdateProduct from "./UpdateProduct";


const ProductAdmin = (props) => {   
  
     const [open, setOpen] = useState(false);  
     const [openDel, setOpenDel] = useState(false);
     const [openEdit, setOpenEdit] = useState(false);
  
    return (
    <ContainerProduct>          
        <ImageProduct src={props.value.img} /><br/>     
        <InfoProduct>  
                     
        <IconProduct onClick={()=>{ setOpenDel(true)}}>          
            <Delete style={{color: "LightSlateGray", fontSize: 20}}/>          
        </IconProduct> 
        <IconProduct onClick={()=>setOpenEdit(true)}>          
            <Edit style={{color: "LightSlateGray", fontSize: 20}}/>          
        </IconProduct>
        <IconProduct onClick={()=>setOpen(true)}>          
            <RemoveRedEye style={{color: "LightSlateGray", fontSize: 20}}/>          
        </IconProduct>                           
        </InfoProduct> 
        <DetailProduct open={open} setOpen={setOpen} value={props.value}></DetailProduct>  
        <UpdateProduct open={openEdit} setOpen={setOpenEdit} value={props.value}></UpdateProduct>  
        <Modal show={openDel} overflow={true} onHide={() => setOpenDel(false)} onExit={async()=> await props.loadProductsDto()}>  
            <Modal.Header> <Modal.Title>Eliminar producto</Modal.Title> </Modal.Header>
                <ModalBody>¿Estas seguro que quieres eliminar este producto?</ModalBody>
                <ModalFooter>
                    <Button onClick={async()=>{ await props.updateProductStatus(props.value.id_product); setOpenDel(false)}}>Eliminar</Button>
                    <Button>Cancelar</Button>
                </ModalFooter>
        </Modal> 
    </ContainerProduct>
    );
};


 //leer estados
const mapStateToProps = (state) => ({  
  productsDto: state.home.productsDto,    
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({  
  loadProductsDto: () => dispatch(homeActions.loadProductsDto()),   
  updateProductStatus: (payload) => dispatch(productActions.updateProductStatus(payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdmin);
