import { ContainerLogin, WrapperLogin, TitleLogin, ButtonLogin, ProductColor, ContainerCart,  WrapperCart,  TitleCart,  TopCart,  TopButtonCart, BottomCart,InfoCart, ProductCart, ProductDetail, ImageCart, DetailsCart, ProductName, ProductId, ProductSize, PriceDetail, ProductAmountContainer,  ProductAmount, ProductPrice, HrCart, Summary, SummaryTitle, SummaryItem,  SummaryItemText, SummaryItemPrice, ButtonCart, EditButton,ImgContainerProd, InfoContainer, AmountContainer, Amount, ButtonProd
} from "../components/Styled_components";

import { connect } from "react-redux";

import * as orderActions from "../store/actions/order";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const Order = (props) => {
  
  return (
    <Modal show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
        <Modal.Header>
          <Modal.Title>Resumen del pedido</Modal.Title>
        </Modal.Header>   
         <InfoCart>
                      { props.cart.map((value) =>                     
                          <ProductCart >
                              <ProductDetail>                              
                                  <ImageCart src={value.stocks.product.img} />
                                  <DetailsCart>
                                      <ProductName>
                                          <b>Producto:</b>{" "}
                                          {value.stocks.product.styles[0].name}{" "}
                                          {value.stocks.product.brands[0].name}{" "}
                                          {value.stocks.product.categories[0].name}
                                      </ProductName>
                                      <ProductId>
                                          <b>ID:</b> {value.stocks.product.id}
                                      </ProductId>
                                      <ProductColor color={value.stocks.color.color} />
                                      <ProductSize>
                                          <b>Talla:</b> {value.stocks.size.size}
                                      </ProductSize>
                                      
                                  </DetailsCart>
                                  </ProductDetail>
                                      <PriceDetail>                                 
                                          <ProductAmountContainer>                  
                                              <ProductAmount> <b>Cantidad: 
                                                {value.req_quantity}</b>
                                              </ProductAmount><br/>
                                              
                                            </ProductAmountContainer>             
                                            <ProductPrice> <b>Precio por unidad: 
                                                  $ {(value.stocks.product.price/ 1000).toFixed(3)}{" "}</b>
                                            </ProductPrice>
                                            <ProductPrice> <b>Subtotal: 
                                                  $ {(value.req_quantity*value.stocks.product.price/ 1000).toFixed(3)}{" "}</b>
                                              </ProductPrice>
                                        </PriceDetail>
                            </ProductCart>)}
                    <HrCart/>       
                  </InfoCart>
        
      
    </Modal>);

  //   <ContainerLogin>
  //     {props.cart.length ? (
  //       <WrapperLogin>
  //         <TitleLogin>Resumen Compra</TitleLogin>
  //         <hr />
  //         {props.cart.map((value) =>
  //           value.stocks ? (
  //             <div>
  //               <b>Id. {value.stocks.product.id}</b>{" "}
  //               {value.stocks.product.styles[0].name}{" "}
  //               {value.stocks.product.brands[0].name}{" "}
  //               {value.stocks.product.categories[0].name}
  //               <br />
  //               <b>Talla:</b>
  //               {value.stocks.size.size}
  //               <br />
  //               <ProductColor color={value.stocks.color.color} />
  //               <br />
  //               <hr />
  //             </div>
  //           ) : null
  //         )}
  //         <br />
  //         <Link to="/">
  //           <ButtonLogin
  //             onClick={async () => {
  //               await props.createOrder();
  //               await props.cart.map((value) => props.updateStock(value.id));
  //             }}
  //           >
  //             Confirmar compra
  //           </ButtonLogin>
  //         </Link>
  //       </WrapperLogin>
  //     ) : null}
  //   </ContainerLogin>
  // );
};

//leer estados
const mapStateToProps = (state) => ({ cart: state.cart.cart });

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  createOrder: () => dispatch(orderActions.createOrder()),  
  updateStock: (payload) => dispatch(orderActions.updateStock(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
