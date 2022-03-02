import { useLocation } from "react-router-dom";
import { Alert, SelectPicker, InputNumber, Button} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import LoginModal from "./login";
import { ContainerProd, WrapperProd, ImgContainerProd, ImageProd, InfoContainer, TitleProd, DescProd, Price, FilterContainer, Filter, FilterTitle, AmountContainer, Amount,  AddContainer, ButtonProd } from "./style";

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as productActions from "../../store/actions/product";
import * as cartActions from "../../store/actions/cart";
import { useHistory } from "react-router-dom";

const Product = (props) => {
        const location = useLocation();
        const history=useHistory()
        const id = location.pathname.split("/")[2];        
        const [stock, setStock] = useState(null);  
        const [openModal, setOpenModal] = useState(false);   

        useEffect( async () => {
            await props.loadProduct(id);    
        }, []);       

        if(props.product){const views= { id: id, views: props.product.views + 1 }; props.updateViews(views); }        

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

        useEffect( async () => { if(props.product)
            {   setColor([ ...new Map( props.product.stock.map((value) => value.color).map((value) => { return [value.id, value]; })).values()]);
                setSize([ ...new Map( props.product.stock.map((value) => value.size).map((value) => { return [value.id, value]; })).values()]);
                 if ((cart.size.id) && (cart.color.id)){
                setStock(props.product.stock.filter( (value) => (value.sizeId === cart.size.id)
                && (value.colorId === cart.color.id)).map((value) => value.available_quantity)[0]);
                 }                 
            }               
        }, [props.product, cart]);

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
                        <TitleProd><p style={{textTransform:"capitalize"}}> {props.product.styles[0].name} {props.product.brands[0].name}{" "}{props.product.categories[0].name} </p></TitleProd>
                        <DescProd>{props.product.desc}</DescProd>
                        <Price> <b>$</b> {(props.product.price / 1000).toFixed(3)} </Price>
                    <FilterContainer>
                        <div style={{display:"flex", flexDirection: "row"}}>
                            <div style={{padding: 15}}>
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
                                                setCart({ ...cart,  color: { id: value }});                                            
                                            }} />: null}    
                            </div>
                            <div style={{padding: 15}}>                    
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
                                                setCart({ ...cart, size: { id: value }});                                            
                                            }} />  : null} 
                            </div> 
                        </div>            
                        
                        {cart.size.id !== null && cart.color.id !== null && stock !== null
                        ? (stock > 0  
                            ? (<div style={{padding: 15}}><h4 style={{color: "DarkGray"}}>Disponible {stock}</h4></div>) 
                            : ( <div style={{padding: 15}}><h4 style={{color: "DarkGray"}}>No disponible</h4></div> )) 
                        : null}
                    </FilterContainer>
                        <AddContainer>             
                            <AmountContainer>
                                <div style={{ width: 150, padding: 15 }}>
                                    <InputNumber style={{borderWidth: 1, borderStyle: "solid", borderColor: "black"}} max={stock} min={1} 
                                        onChange={(value)=>{ setCart({ ...cart, req_quantity: value})}}/>
                                </div>                                
                            </AmountContainer>
                        <div style={{width: 150, padding: 15 }}>
                        <Button  style={{background: "black", color: "white", boxShadow: "3px 3px 3px gray"}}
                            onClick={async () => {
                                if (cart.size.id !== null && cart.color.id !== null) 
                                    { if (props.user && stock !== 0) { await props.createCart(cart); await props.loadCart()}
                                    else if(stock===0){ Alert.error("El producto no esta disponible")}
                                    else { Alert.warning("Debes iniciar sesión para agregar productos al carrito");
                                              setOpenModal(true)
                                    //history.push("/login")
                                    }
                                } else { Alert.warning("Debe seleccionar un color y una talla")}
                            }}> Agregar al carro </Button>
                        </div>                    
                        </AddContainer>
                    </InfoContainer>                
                </WrapperProd>
                ) : null}
                <Footer /> 
                <LoginModal open={openModal} setOpen={setOpenModal}></LoginModal>             
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
  loadCart: () => dispatch(cartActions.loadCart()),      
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
