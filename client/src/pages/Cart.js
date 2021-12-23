import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  ContainerCart,
  WrapperCart,
  TitleCart,
  TopCart,
  TopButtonCart,
  TopTexts,
  TopText,
  BottomCart,
  InfoCart,
  ProductCart,
  ProductDetail,
  ImageCart,
  DetailsCart,
  ProductName,
  ProductId,
  ProductColor,
  ProductSize,
  PriceDetail,
  ProductAmountContainer,
  ProductAmount,
  ProductPrice,
  HrCart,
  Summary,
  SummaryTitle,
  SummaryItem,
  SummaryItemText,
  SummaryItemPrice,
  ButtonCart,
} from "../components/Styled_components";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as cartActions from "../store/actions/cart";

const Cart = (props) => {
  useEffect(() => {
    props.loadCart();
  }, []);
  const amount = props.cart
    .map((value) => value.req_quantity * value.stocks[0].product.price)
    .reduce((a, b) => a + b, 0);

  return (
    <ContainerCart>
      <Navbar />
      <Announcement />
      {props.cart.length ? (
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
              {props.cart.map((value) =>
                value.stocks.length ? (
                  <ProductCart>
                    {props.cart
                      .filter(
                        (value) => value.stocks[0].available_quantity == 0
                      )
                      .map((value) => value.id).length !== 0
                      ? props.cart
                          .filter(
                            (value) => value.stocks[0].available_quantity == 0
                          )
                          .map((value) => value.id)
                          .map((value) => props.deleteCart(value))
                      : null}
                    <ProductDetail>
                      <ImageCart src={value.stocks[0].product.img} />
                      <DetailsCart>
                        <ProductName>
                          <b>Producto:</b>{" "}
                          {value.stocks[0].product.styles[0].name}{" "}
                          {value.stocks[0].product.brands[0].name}{" "}
                          {value.stocks[0].product.categories[0].name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {value.stocks[0].product.id}
                        </ProductId>
                        <ProductColor color={value.stocks[0].color.color} />
                        <ProductSize>
                          <b>Talla:</b> {value.stocks[0].size.size}
                        </ProductSize>
                        <TopButtonCart
                          onClick={() => props.deleteCart(value.id)}
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
                        $ {(value.stocks[0].product.price / 1000).toFixed(3)}{" "}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
