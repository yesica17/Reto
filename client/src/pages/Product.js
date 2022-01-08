import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ContainerProd, WrapperProd, ImgContainerProd, ImageProd, InfoContainer,
  TitleProd, DescProd, Price, FilterContainer, Filter, FilterTitle, FilterColor,
  FilterSize, FilterSizeOption, FilterColorOption, AmountContainer, Amount,  AddContainer, ButtonProd } from "../components/Styled_components";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as productActions from "../store/actions/product";
import * as optionsActions from "../store/actions/options";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Product = (props) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(); 

  const updateStock = () => {
    if (props.product && cart.size.id !== null && cart.color.id !== null) {
      setStock(
        props.product.stock
          .filter(
            (value) =>
              value.sizeId == cart.size.id && value.colorId == cart.color.id
          )
          .map((value) => value.available_quantity)[0]
      );
    }
  };

  useEffect( async () => {
    await props.loadProduct(id);
    
    
  }, []);

  if(props.product){const views= { 
    id: id,
    views: props.product.views + 1,   
  };       
    props.updateViews(views);}

  const handleQuantity = (type) => {
    if (type === "inc") {
      if (quantity < stock) {
        setQuantity(quantity + 1);
      }
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const cart_init = { 
    req_quantity: 1,
    state_cart: true,
    order: { id: null },
    size: {id: null },
    color: {id: null},
    product: {id: null},
    user: {id: null},
  };

  const [cart, setCart] = useState(cart_init);

  return (
    <ContainerProd>
      <Navbar />
      <Announcement />

      {props.product ? (
        <WrapperProd>
          <ImgContainerProd>
            <ImageProd src={props.product.img} />
          </ImgContainerProd>
          <InfoContainer>
            <TitleProd>
              {props.product.styles[0].name} {props.product.brands[0].name}{" "}
              {props.product.categories[0].name}
            </TitleProd>
            <DescProd>{props.product.desc}</DescProd>
            <Price>
              <b>$</b> {(props.product.price / 1000).toFixed(3)}
            </Price>

            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor
                  onClick={(value) => {
                    setCart({
                      ...cart,
                      color: { id: value.target.value },
                    });
                  }}
                >
                  {[
                    ...new Map(
                      props.product.stock
                        .map((value) => value.color)
                        .map((value) => {
                          return [value.id, value];
                        })
                    ).values(),
                  ].map((value) => (
                    <FilterColorOption value={value.id} key={value.id}>
                      {value.color}
                    </FilterColorOption>
                  ))}
                </FilterColor>{" "}
                <FilterTitle>Talla</FilterTitle>
                <FilterSize
                  onClick={(value) => {
                    setCart({
                      ...cart,
                      size: { id: value.target.value },
                    });
                    updateStock();
                  }}
                >
                  {[
                    ...new Map(
                      props.product.stock
                        .map((value) => value.size)
                        .map((value) => {
                          return [value.id, value];
                        })
                    ).values(),
                  ].map((value) => (
                    <FilterSizeOption value={value.id} key={value.id}>
                      {value.size}
                    </FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>

              {cart.size.id !== null && cart.color.id !== null ? (
                stock > 0 ? (
                  <h3>Disponible {stock}</h3>
                ) : (
                  <h3>No disponible</h3>
                )
              ) : null}
            </FilterContainer>
            <AddContainer>
             
                <AmountContainer>
                  <Remove
                    onClick={() => {
                      handleQuantity("dec");
                      setCart({
                        ...cart,
                        req_quantity: quantity,
                      });
                    }}
                  />
                  <Amount>{quantity}</Amount>
                  <Add
                    onClick={() => {
                      handleQuantity("inc");
                      setCart({
                        ...cart,
                        req_quantity: quantity,
                      });
                    }}
                  />
                </AmountContainer>
             

              <ButtonProd
                onClick={async () => {
                  if (cart.size.id !== null && cart.color.id !== null) {
                    if (stock !== 0) {
                      await props.createCart(cart);
                    } else {
                      Alert.error("El producto no esta disponible!");
                    }
                  } else {
                  Alert.warning("Debe seleccionar un color y una talla")
                  }
                }}
              >
                Agregar al carro
              </ButtonProd>              
              
            </AddContainer>
          </InfoContainer>
        </WrapperProd>
      ) : null}
      <Footer />
    </ContainerProd>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  product: state.product.product,
  
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadProduct: (payload) => dispatch(productActions.loadProduct(payload)),
  createCart: (payload) => dispatch(productActions.createCart(payload)),
  updateViews: (payload) => dispatch(productActions.updateViews(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
