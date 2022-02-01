import { Modal, SelectPicker, InputNumber, Whisper, Tooltip, Table, Alert, Button, InputGroup, Icon, Input} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


import { connect } from "react-redux";
import * as optionsActions from "../../store/actions/options";
import * as homeActions from "../../store/actions/home";
import * as productActions from "../../store/actions/product";
import { useState, useEffect } from "react";

import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import {Help} from "@material-ui/icons";

const UpdateProduct = (props) => { 

     useEffect(() => {        
        props.loadProductsDto();
        props.loadBrand();
        props.loadStyle();
        props.loadCategory();
    }, []); 

    const product_init = {
    id: props.value.id_product,
    desc: "",
    img: "",
    price: null,
    categories: [{
        id: null    
    }],
    styles: [{
        id: null   
    }],
    brands: [{
        id: null  
    }]
    }

    const [product, setProduct] = useState(product_init);  
    

  return (
    <div>
    <Modal size= "sm" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
        <Modal.Header>
          <Modal.Title><h5>Actualizar producto</h5></Modal.Title>
        </Modal.Header>  
        <ModalBody>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
             <SelectPicker
                                style={{width: 250}}
                                data={props.categories}
                                labelKey="name"
                                valueKey="id"
                                size="md"
                                cleanable= {false}
                                searchable={false}
                                placeholder="Elige la categoría"
                                onSelect={async (value) => {
                                        setProduct({
                                        ...product,
                                        categories: [{ id: value }],
                                        });
                                }}
                                />

            <SelectPicker
                                style={{width: 250}}
                                data={props.styles}
                                labelKey="name"
                                valueKey="id"
                                size="md"
                                cleanable= {false}
                                searchable={false}
                                placeholder="Elige el estilo"
                                onSelect={async (value) => {
                                    setProduct({
                                    ...product,
                                    styles: [{ id: value }],
                                    });
                            }}
                                />
                
            <SelectPicker
                                style={{width: 250}}
                                data={props.brands}
                                labelKey="name"
                                valueKey="id"
                                size="md"
                                cleanable= {false}
                                searchable={false}
                                placeholder="Elige la marca"
                                onSelect={async (value) => {
                                    setProduct({
                                    ...product,
                                    brands: [{ id: value }],
                                    });
                            }}
                                />

            <InputNumber  size= "md" prefix="$"  min={0} onChange={(value) => setProduct({ ...product, price: value})
                    }/>
            </div><div style={{width: 200}}></div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
            <InputGroup>
                <InputGroup.Addon>
                    <Icon icon="image" />
                </InputGroup.Addon>
                <Input onChange={(value) => setProduct({ ...product, img: value})}/>
            </InputGroup>
            <Whisper
                trigger="hover"
                placement= "rightTop"
                speaker={
            <Tooltip>Introduzca la url de la imagen</Tooltip>}><Help/></Whisper>
            </div>
            <Input size = "md" componentClass="textarea" rows={8} style={{ width: 300 }} placeholder="Escriba la descripción del producto" 
            onChange={(value) => setProduct({ ...product, desc: value})}/> 
            
            </div>
                       
        </ModalBody>
        <ModalFooter><Button onClick={async()=>{
                if(product.desc !== "" || product.img !== "" || product.price !== null || product.categories[0].id !== null || product.styles[0].id !== null || product.brands[0].id !== null){
                    console.log(product);
                    await props.updateProduct(product);
                    await props.loadProductsDto();
                    } else {Alert.warning("Edite al menos un campo")}
            }}>Actualizar</Button>  
             <Button onClick={()=>props.setOpen(false)}>Cancelar</Button>  </ModalFooter>      
    </Modal>    
    </div>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  productsDto: state.home.productsDto,
  brands: state.options.brands,
  styles: state.options.styles,
  categories: state.options.categories, 
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadProductsDto: () => dispatch(homeActions.loadProductsDto()),
  loadBrand: () => dispatch(optionsActions.loadBrand()),  
  loadStyle: () => dispatch(optionsActions.loadStyle()),  
  loadCategory: () => dispatch(optionsActions.loadCategory()),  
  updateProduct: (payload) => dispatch(productActions.updateProduct(payload)),  
  
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);