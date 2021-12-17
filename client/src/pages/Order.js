import {
  ContainerLogin,
  WrapperLogin,
  TitleLogin,
  ButtonLogin,
  ProductColor,
} from "../components/Styled_components";

import { connect } from "react-redux";

import * as orderActions from "../store/actions/order";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as cartActions from "../store/actions/cart";

const Order = (props) => {
  useEffect(() => {
    props.loadCart();
  }, []);
  //console.log(props.cart);
  return (
    <ContainerLogin>
      {props.cart.length ? (
        <WrapperLogin>
          <TitleLogin>Resumen Compra</TitleLogin>
          <hr />
          {props.cart.map((value) =>
            value.stocks.length ? (
              <div>
                <b>Id. {value.stocks[0].product.id}</b>{" "}
                {value.stocks[0].product.styles[0].name}{" "}
                {value.stocks[0].product.brands[0].name}{" "}
                {value.stocks[0].product.categories[0].name}
                <br />
                <b>Talla:</b>
                {value.stocks[0].size.size}
                <br />
                <ProductColor color={value.stocks[0].color.color} />
                <br />
                <hr />
              </div>
            ) : null
          )}
          <br />
          <Link to="/">
            <ButtonLogin
              onClick={async () => {
                await props.createOrder();
                await props.cart.map((value) => props.updateStock(value.id));
              }}
            >
              Confirmar compra
            </ButtonLogin>
          </Link>
        </WrapperLogin>
      ) : null}
    </ContainerLogin>
  );
};

//leer estados
const mapStateToProps = (state) => ({ cart: state.cart.cart });

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  createOrder: () => dispatch(orderActions.createOrder()),
  loadCart: () => dispatch(cartActions.loadCart()),
  updateStock: (payload) => dispatch(orderActions.updateStock(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
