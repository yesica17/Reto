import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  ContainerProd,
  WrapperProd,
  ImgContainerProd,
  ImageProd,
  InfoContainer,
  TitleProd,
  DescProd,
  Price,
  FilterContainer,
  Filter,
  FilterTitle,
  FilterColor,
  FilterSize,
  FilterSizeOption,
  FilterColorOption,
  AmountContainer,
  Amount,
  AddContainer,
  ButtonProd,
} from "../components/Styled_components";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as productActions from "../store/actions/product";
import * as optionsActions from "../store/actions/options";

import { Link } from "react-router-dom";

const Product = (props) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    props.loadProduct(id);
  }, []);

  const currency = function (number) {
    return new Intl.NumberFormat("en-IN", {
      currency: "USD",
    }).format(number);
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const cart_init = {
    req_quantity: 1,
    state_cart: true,
    order: { id: null },
    size: {
      id: null,
    },
    color: {
      id: null,
    },
    product: {
      id: null,
    },
    user: {
      id: null,
    },
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
              <b>$</b> {currency(props.product.price)}
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
                props.product.stock
                  .filter(
                    (value) =>
                      value.sizeId == cart.size.id &&
                      value.colorId == cart.color.id
                  )
                  .map((value) => value.available_quantity)[0] > 0 ? (
                  <h3>
                    Disponible{" "}
                    {
                      props.product.stock
                        .filter(
                          (value) =>
                            value.sizeId == cart.size.id &&
                            value.colorId == cart.color.id
                        )
                        .map((value) => value.available_quantity)[0]
                    }
                  </h3>
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
                      req_quantity: quantity - 1,
                    });
                  }}
                />
                <Amount>{quantity}</Amount>
                <Add
                  onClick={() => {
                    handleQuantity("inc");
                    setCart({
                      ...cart,
                      req_quantity: quantity + 1,
                    });
                  }}
                />
              </AmountContainer>

              <ButtonProd
                onClick={async () => {
                  if (
                    props.product.stock
                      .filter(
                        (value) =>
                          value.sizeId == cart.size.id &&
                          value.colorId == cart.color.id
                      )
                      .map((value) => value.available_quantity)[0] !== 0
                  ) {
                    await props.createCart(cart);
                  } else {
                    alert("El producto no esta disponible!");
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
  colors: state.options.colors,
  sizes: state.options.sizes,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadProduct: (payload) => dispatch(productActions.loadProduct(payload)),
  createCart: (payload) => dispatch(productActions.createCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
