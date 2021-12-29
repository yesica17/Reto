import {Add, Remove, Edit} from "@material-ui/icons";
import { Drawer } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {  ContainerCart,  WrapperCart,  TitleCart,  TopCart,  TopButtonCart, BottomCart,InfoCart, ProductCart, ProductDetail, ImageCart, DetailsCart, ProductName, ProductId, ProductColor, ProductSize, PriceDetail, ProductAmountContainer,  ProductAmount, ProductPrice, HrCart, Summary, SummaryTitle, SummaryItem,  SummaryItemText, SummaryItemPrice, ButtonCart, EditButton, ContainerProd, WrapperProd, ImgContainerProd, ImageProd, InfoContainer,
  TitleProd, DescProd, Price, FilterContainer, Filter, FilterTitle, FilterColor,
  FilterSize, FilterSizeOption, FilterColorOption, AmountContainer, Amount,  AddContainer, ButtonProd} from "../components/Styled_components";

import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as cartActions from "../store/actions/cart";
import * as productActions from "../store/actions/product";

const Cart = (props) => {       

    const [cart, setCart] = useState(null);
    const [open, setOpen] = useState(false); 
    const [stock, setStock] = useState(1);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
      props.loadCart();
      
      
    }, []);    
if(props.cart){console.log(props.cart.map(value=>value.stocks.available_quantity))}
  

  const updateStock = () => {
    if (props.cart){      
      setStock(
        props.cart.map(value=>value.stocks.available_quantity
      ))
    }
  };
    
const amount = props.cart
      .map((value) => value.req_quantity * value.stocks.product.price)
      .reduce((a, b) => a + b, 0);

const handleQuantity = (type) => {
    if (type === "inc") {
       if (quantity < stock) {
        setQuantity(quantity + 1);
      
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  }}

  return (   
    <Fragment>
      {cart?
      <Drawer placement='right' show={open} onHide={() => setOpen(false)}>
            <Drawer.Header>
                  <Drawer.Title>{cart.stocks.id}{cart.stocks.product.styles[0].name}{" "}
                                            {cart.stocks.product.brands[0].name}{" "}
                                            {cart.stocks.product.categories[0].name}
                  </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                  
                  <WrapperProd>
          <ImgContainerProd>
            <ImageProd src={cart.stocks.product.img}/>
          </ImgContainerProd>
          <InfoContainer>         
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
                    onClick={async() => {
                      await updateStock();
                      await handleQuantity("inc");
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
                      alert("El producto no esta disponible!");
                    }
                  } else {
                    alert("Debe seleccionar una talla y color");
                  }
                }}
              >
                Agregar al carro
              </ButtonProd>
            </AddContainer>
          </InfoContainer>
        </WrapperProd>
            </Drawer.Body>
      </Drawer> : null}        
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
                                            await props.deleteCart(value.id);
                                            await props.loadCart();
                                          }}
                                      >
                                        Eliminar producto
                                      </TopButtonCart>
                                  </DetailsCart>
                                </ProductDetail>
                                <PriceDetail>
                                  
                                  <EditButton onClick={()=>{
                                    setCart(value);
                                    setOpen(true);
                                    }
                                }>Edit this product{" "}<Edit style={{ color: "blue", fontSize: 16 }} ></Edit></EditButton>

                                                        
                                  
                                  <ProductAmountContainer>                             
                                    <ProductAmount>{value.req_quantity}</ProductAmount>
                                    </ProductAmountContainer>
                                  <ProductPrice>
                                    $ {(value.stocks.product.price / 1000).toFixed(3)}{" "}
                                  </ProductPrice>
                              </PriceDetail>
                          </ProductCart>
                      
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
      </Fragment>
      
  );
};

//leer estados
const mapStateToProps = (state) => ({
  cart: state.cart.cart,
   product: state.product.product,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadCart: () => dispatch(cartActions.loadCart()),
  loadProduct: (payload) => dispatch(productActions.loadProduct(payload)),
  deleteCart: (payload) => dispatch(cartActions.deleteCart(payload)),
  setCart: (payload) => dispatch(cartActions.setCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);