import { ButtonLogin, ProductColor, InfoCart, ProductOrder, ProductDetail, ImageCart, DetailsCart, ProductName, ProductId, ProductSize, PriceDetail, ProductAmountContainer,  ProductAmount, ProductPrice, HrCart,
ButtonOrder, InfoOrder, ProductDetailOrder, ImageOrder, ProductTitle, PriceOrder, DetailsOrder } from "../components/Styled_components";

import { connect } from "react-redux";

import * as orderActions from "../store/actions/order";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const Order = (props) => {    

 const data = {
        user: "",
        order: null,
        address: "",
        amount: null,
        products: []    
    };

  const [infoEmail, setInfoEmail] = useState(data);

  useEffect(() => {
        if(props.cart){
            const title= props.cart.map(value=>value.stocks.product.styles[0].name+" "+ value.stocks.product.brands[0].name + " " + value.stocks.product.categories[0].name + " " +"x" + " " + value.req_quantity + " " + "ud.");             

            const name= props.user.name;
            setInfoEmail({...infoEmail, user: name, products: title})      
         }  
         
  }, [props.cart])  

  return (
    <Modal show={props.open} overflow={(true)} size ="sm" onHide={() => props.setOpen(false)}>  
        <Modal.Header>
          <Modal.Title>Resumen del pedido</Modal.Title>
        </Modal.Header><br/>   
         <InfoOrder>
                      { props.cart.map((value) =>                     
                          <ProductOrder >
                              <ProductDetailOrder>                              
                                  <ImageOrder src={value.stocks.product.img} />
                                  <DetailsOrder>
                                      <ProductTitle>
                                          <b>Producto:</b>{" "}
                                          {value.stocks.product.styles[0].name}{" "}
                                          {value.stocks.product.brands[0].name}{" "}
                                          {value.stocks.product.categories[0].name}
                                      </ProductTitle>
                                      <ProductTitle><b>Color:</b>{" "}
                                      {value.stocks.color.color} </ProductTitle>
                                      <ProductTitle>
                                          <b>Talla:</b> {value.stocks.size.size}
                                      </ProductTitle>
                                      </DetailsOrder>
                                  </ProductDetailOrder>
                                      <PriceOrder >
                                        <DetailsOrder>                         
                                              <ProductTitle> <b>Cantidad x
                                                {value.req_quantity}</b>
                                              </ProductTitle><br/>                
                                            <ProductTitle> <b>Precio por unidad: 
                                                  $ {(value.stocks.product.price/ 1000).toFixed(3)}{" "}</b>
                                            </ProductTitle><br/>  
                                            
                                              </DetailsOrder>   
                                        </PriceOrder >
                            </ProductOrder>)}                           
                  </InfoOrder>
                  <div style={{margin: 20}}>
                  <ButtonOrder
                    onClick={async () => {                        
                      await props.createOrder();
                      await props.cart.map((value) => props.updateStock(value.id));
                      await props.setOpen(false);    
                      await props.sendEmail(infoEmail);
                    }}
                  >
                    Confirmar compra
                  </ButtonOrder>{" "}
                  <Button onClick={() => props.setOpen(false)} appearance="subtle">
                    <b>Cancelar</b>
                  </Button></div>
        
      
    </Modal>);  
};

//leer estados
const mapStateToProps = (state) => ({ cart: state.cart.cart, user: state.login.user, contact: state.contact.contact });

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  createOrder: () => dispatch(orderActions.createOrder()),  
  updateStock: (payload) => dispatch(orderActions.updateStock(payload)),  
  sendEmail: (payload) => dispatch(orderActions.sendEmail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
