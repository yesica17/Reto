import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { Alert, SelectPicker} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ContainerProd, WrapperProd, ImgContainerProd, ImageProd, InfoContainer,
  TitleProd, DescProd, Price, FilterContainer, Filter, FilterTitle, AmountContainer, Amount,  AddContainer, ButtonProd } from "../components/Styled_components";

import { useState, useEffect } from "react";

import { connect } from "react-redux";

import * as productActions from "../store/actions/product";

import { useHistory } from "react-router-dom";


const Product = (props) => {
  const location = useLocation();
  const history=useHistory()
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(null);   

  

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
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  const updateStock = (payload) => {
    if (props.product && (cart.size.id || payload.id_size) && 
    (cart.color.id || payload.id_color)) {
      setStock(
        props.product.stock
          .filter(
            (value) =>
              (value.sizeId === cart.size.id || value.sizeId === payload.id_size)&& 
              (value.colorId === cart.color.id || value.colorId === payload.id_color) 
          )
          .map((value) => value.available_quantity)[0]
      );
    }
  };

  console.log("carrito", cart, "stock", stock);
  

  useEffect( async () => {
    if(props.product){setColor([
                    ...new Map(
                      props.product.stock
                        .map((value) => value.color)
                        .map((value) => {
                          return [value.id, value];
                        })
                    ).values(),
                  ]);
                setSize([
                    ...new Map(
                      props.product.stock
                        .map((value) => value.size)
                        .map((value) => {
                          return [value.id, value];
                        })
                    ).values(),
                  ])}   
    
  }, [props.product]);

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
                <FilterTitle>Color</FilterTitle>{" "}
                    {color.length?
                        <SelectPicker
                                style={{width: 100}}
                                data={color}
                                labelKey="color_spa"
                                valueKey="id"
                                size="sm"
                                cleanable={false}
                                searchable={false}
                                placeholder="Tu color"
                                onChange={(value) => {
                                    setCart({
                                    ...cart,
                                    color: { id: value },
                                    });
                                    updateStock({id_color: value, id_size: null});
                    }} />: null}
                
                <FilterTitle>Talla</FilterTitle>{" "}
                {size.length?
                    <SelectPicker
                                style={{width: 100}}
                                data={size}
                                labelKey="size"
                                valueKey="id"
                                size="sm"
                                cleanable={false}
                                searchable={false}
                                placeholder="Tu talla"
                                onChange={(value) => {
                                    setCart({
                                    ...cart,
                                    size: { id: value },
                                    });
                                    updateStock({id_color: null, id_size: value});
                        }} />  : null}              
              </Filter>

              {cart.size.id !== null && cart.color.id !== null && stock !== null? (                 
                stock > 0 ? (
                  <h4 style={{color: "DarkGray"}}>Disponible {stock}</h4>
                ) : (
                  <h4 style={{color: "DarkGray"}}>No disponible</h4>
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
                        req_quantity: quantity-1,
                      });
                    }}
                  />
                  <Amount>{quantity}</Amount>
                  <Add
                    onClick={() => {
                      handleQuantity("inc");
                      setCart({
                        ...cart,
                        req_quantity: quantity+1,
                      });
                    }}
                  />
                </AmountContainer>

              <ButtonProd
                onClick={async () => {
                  if (cart.size.id !== null && cart.color.id !== null) {
                    if (props.user && stock !== 0) {
                      await props.createCart(cart);
                    } else if(stock===0){
                      Alert.error("El producto no esta disponible")
                    }
                    else {
                      Alert.warning("Debes iniciar sesión para agregar productos al carrito");
                      history.push("/login")
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
  user: state.login.user,
  
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadProduct: (payload) => dispatch(productActions.loadProduct(payload)),
  createCart: (payload) => dispatch(productActions.createCart(payload)),
  updateViews: (payload) => dispatch(productActions.updateViews(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
