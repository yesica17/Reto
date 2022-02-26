import { Modal, SelectPicker, InputNumber, Alert, Button, InputGroup, Icon, Input} from 'rsuite';
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
    desc: props.value.desc,
    img: props.value.img,
    price: props.value.price,
    categories: [{
        id: props.value.id_cat[0]  
    }],
    styles: [{
        id: props.value.id_style[0]   
    }],
    brands: [{
        id: props.value.id_brand[0]  
    }]
    }

    const [product, setProduct] = useState(product_init);  
    

  return (
    <div>
    <Modal size= "xs" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
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
        <div style={{marginTop: 10}}>
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
        </div>
        <div style={{marginTop: 10}}> 
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
            </div>    
            <div style={{marginTop: 10, width: 250}}> 
            <InputNumber  size= "md" prefix="$"  min={0} onChange={(value) => setProduct({ ...product, price: value})
                    }/></div> 
            </div> 
            <div style={{marginTop: 10, width: 250}}>            
            <InputGroup>
                <InputGroup.Addon>
                    <Icon icon="image" />
                </InputGroup.Addon>
                <Input onChange={(value) => setProduct({ ...product, img: value})}/>
            </InputGroup>   </div>
            <div style={{marginTop: 10, width: 250}}>                     
            <Input size = "md" componentClass="textarea" rows={8} placeholder="Escriba la descripción del producto" 
            onChange={(value) => setProduct({ ...product, desc: value})}/>   </div>                    
        </ModalBody>
        <ModalFooter><Button appearance='primary' onClick={async()=>{                          
                if(product.desc !== props.value.desc || product.img !== props.value.img || product.price !== props.value.price || product.categories[0].id !== props.value.id_cat[0]   || product.styles[0].id !== props.value.id_style[0]   || product.brands[0].id !== props.value.id_brand[0]  ){
                    await props.updateProduct(product);
                    await props.loadProductsDto();
                    props.setOpen(false);
                    } else {Alert.warning("Edite al menos un campo", 3000)}
            }}>Actualizar</Button>  
             <Button appearance='primary' onClick={()=>props.setOpen(false)}>Cancelar</Button>  </ModalFooter>      
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