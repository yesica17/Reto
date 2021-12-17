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
    props.loadColor();
    props.loadSize();
  }, []);

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
  //console.log(cart);

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
              <b>$</b> {props.product.price}
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
                  {props.colors.length
                    ? props.colors.map((value) => (
                        <FilterColorOption value={value.id} key={value.id}>
                          {value.color}
                        </FilterColorOption>
                      ))
                    : null}
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
                  {props.sizes.length
                    ? props.sizes.map((value) => (
                        <FilterSizeOption value={value.id} key={value.id}>
                          {value.size}
                        </FilterSizeOption>
                      ))
                    : null}
                </FilterSize>
              </Filter>
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

              <ButtonProd onClick={async () => await props.createCart(cart)}>
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
  loadColor: () => dispatch(optionsActions.loadColor()),
  loadSize: () => dispatch(optionsActions.loadSize()),
  createCart: (payload) => dispatch(productActions.createCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
