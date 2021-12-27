import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {  ContainerCart,  WrapperCart,  TitleCart,  TopCart,  TopButtonCart, BottomCart,InfoCart, ProductCart, ProductDetail, ImageCart, DetailsCart, ProductName, ProductId, ProductColor, ProductSize, PriceDetail, ProductAmountContainer,  ProductAmount, ProductPrice, HrCart, Summary, SummaryTitle, SummaryItem,  SummaryItemText, SummaryItemPrice, ButtonCart } from "../components/Styled_components";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as cartActions from "../store/actions/cart";

const Cart = (props) => {

    let cart =props.cart;  

    useEffect(() => {
      props.loadCart();
      
    }, []);


    const amount = props.cart
      .map((value) => value.req_quantity * value.stocks.product.price)
      .reduce((a, b) => a + b, 0);

  return (
    <ContainerCart>
      <Navbar />
      <Announcement />
      {cart.length ? (
        <WrapperCart>
          <TitleCart>Carrito de Compras</TitleCart>
          <TopCart>
            <Link to="/">
              <TopButtonCart>Continuar Comprando</TopButtonCart>
            </Link>
            <TopButtonCart type="filled">COMPRAR AHORA</TopButtonCart>
          </TopCart>
          <BottomCart>
            <InfoCart>
                {cart.map((value) =>
                    value.stocks && value.req_quantity <= value.stocks.available_quantity? (
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
                                    <TopButtonCart 
                                        onClick={async () => {
                                          //await props.deleteCart(value.id);
                                          //await props.loadCart();
                                         const x = cart;
                                          await cart.forEach((item, index )=> {
                                            if (item.stocks.id==value.stocks.id){
                                              x[index].req_quantity = 100;
                                            }
                                          })
                                          props.setCart(x)
                                        

                                        }}
                                    >
                                      Eliminar producto
                                    </TopButtonCart>
                                </DetailsCart>
                              </ProductDetail>
                              <PriceDetail>
                                <ProductAmountContainer>
                                  <Add />
                                  <ProductAmount>{value.req_quantity}</ProductAmount>
                                  <Remove />
                                </ProductAmountContainer>
                                <ProductPrice>
                                  $ {(value.stocks.product.price / 1000).toFixed(3)}{" "}
                                </ProductPrice>
                            </PriceDetail>
                        </ProductCart>
                    ) : 
                  value.stocks && value.req_quantity > value.stocks.available_quantity? (
                        <ProductCart style={{backgroundColor:'gray'}}>
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
                                    <TopButtonCart
                                        onClick={async () => {
                                          //await props.deleteCart(value.id);
                                          //await props.loadCart();
                                          const x = props.cart;
                                          await props.cart.forEach((item, index )=> {
                                            if (item.stocks.id==value.stocks.id){
                                              x[index].req_quantity = 1;
                                            }
                                          })
                                          props.setCart(x)
                                        }}
                                    >
                                      Eliminar producto
                                    </TopButtonCart>
                                </DetailsCart>
                              </ProductDetail>
                              <PriceDetail>
                                <ProductAmountContainer>
                                  <Add />
                                  <ProductAmount>{value.req_quantity}</ProductAmount>
                                  <Remove />
                                </ProductAmountContainer>
                                <ProductPrice>
                                  $ {(value.stocks.product.price / 1000).toFixed(3)}{" "}
                                </ProductPrice>
                            </PriceDetail>
                        </ProductCart>
                    ) : null
                                      )}
              <HrCart />
            </InfoCart>
            <Summary>
              <SummaryTitle>RESUMEN ORDEN</SummaryTitle>

              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>

                <SummaryItemPrice>
                  $ {(amount / 1000).toFixed(3)}
                </SummaryItemPrice>
              </SummaryItem>
              <Link to="/contact">
                <ButtonCart>COMPRAR AHORA</ButtonCart>
              </Link>
            </Summary>
          </BottomCart>
        </WrapperCart>
      ) : null}
      <Footer />
    </ContainerCart>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadCart: () => dispatch(cartActions.loadCart()),
  deleteCart: (payload) => dispatch(cartActions.deleteCart(payload)),
  setCart: (payload) => dispatch(cartActions.setCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
