import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import {
  ContainerNavbar, WrapperNavbar, LeftNavbar, GenreNavbar, SearchContainerNavbar,  InputNavbar, ButtonNavbar, CenterNavbar, RightNavbar, MenuItemNavbar,} 
  from "./Styled_components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as cartActions from "../store/actions/cart";
import { connect } from "react-redux";

const Navbar = (props) => {
  useEffect(() => {
    props.loadCart();
  }, []);
  const len = props.cart.length;
  return (
    <ContainerNavbar>
      <WrapperNavbar>
        <LeftNavbar>
          <GenreNavbar></GenreNavbar>
          <SearchContainerNavbar>
            <InputNavbar placeholder="Búsqueda" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainerNavbar>
        </LeftNavbar>
        <CenterNavbar>
          <Link to={`/`}>
            <ButtonNavbar>Cidenet Shop</ButtonNavbar>
          </Link>
        </CenterNavbar>
        <RightNavbar>
          <Link to="/cart">
            <MenuItemNavbar>
              <Badge badgeContent={len} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItemNavbar>
          </Link>
        </RightNavbar>
      </WrapperNavbar>
    </ContainerNavbar>
  );
};

//leer estados
const mapStateToProps = (state) => ({ cart: state.cart.cart });

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadCart: () => dispatch(cartActions.loadCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
