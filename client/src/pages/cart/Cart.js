import { Edit, WarningSharp, AssignmentLateSharp } from "@material-ui/icons";
import { Drawer, Modal, Button, InputNumber, Alert} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Contact from "../contact/Contact";
import Notification from "./modal";
import {  ContainerCart,  WrapperCart,  TitleCart,  TopCart,  TopButtonCart, BottomCart,InfoCart, ProductCart, ProductDetail, ImageCart, DetailsCart, ProductName, ProductId, ProductColor, ProductSize, PriceDetail, ProductAmountContainer,  ProductAmount, ProductPrice, HrCart, Summary, SummaryTitle, SummaryItem,  SummaryItemText, SummaryItemPrice, ButtonCart, EditButton,ImgContainerProd, InfoContainer, AmountContainer, Amount, ButtonProd} from "./style";

import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as cartActions from "../../store/actions/cart";
import * as contactActions from "../../store/actions/contact";
import ModalBody from "rsuite/lib/Modal/ModalBody";
import ModalFooter from "rsuite/lib/Modal/ModalFooter";

let stateCart = [];

const Cart = (props) => {       

    const [cart, setCart] = useState(null);
    const [open, setOpen] = useState(false);     
    const [openDel, setOpenDel] = useState(false);     
    const [quantity, setQuantity] = useState(1);  
    const [openModal, setOpenModal] = useState(false);    
    const [openNotification, setOpenNotification] = useState(false);    
    const [idCart, setIdCart] = useState(null);     

    useEffect(() => {            
        props.loadCart();                      
    }, []);     

    useEffect(() => {                  
        stateCart=props.cart.filter( value=>value.req_quantity > value.stocks.available_quantity);                  
    }, [props.cart]);         

    const amount = props.cart.filter(value=>value.stocks.available_quantity!==0 
        && value.req_quantity<= value.stocks.available_quantity).map((value) => value.req_quantity * value.stocks.product.price).reduce((a, b) => a + b, 0);
            
    return (   
        <Fragment>
            {cart?      
            <Drawer 
                placement='right' size='xs' 
                onEnter={()=>{ if (!(cart.req_quantity<cart.stocks.available_quantity)){ setQuantity(cart.stocks.available_quantity);                      
                    setCart({...cart, req_quantity: cart.stocks.available_quantity})}
                }}
                show={open} 
                onHide={() => setOpen(false)}>
                    <Drawer.Header>
                        <Drawer.Title>{cart.stocks.product.styles[0].name}{" "}{cart.stocks.product.brands[0].name}{" "}{cart.stocks.product.categories[0].name}</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <ImgContainerProd>
                                <ImageCart src={cart.stocks.product.img} />
                        </ImgContainerProd><br/>
                        <InfoContainer>
                                {cart.stocks.available_quantity>0
                                ?(<AmountContainer>
                                    <div style={{ width: 120}}>
                                    <InputNumber style={{borderWidth: 1, borderStyle: "solid", borderColor: "black"}} max={cart.stocks.available_quantity} min={1} 
                                        onChange={(value)=>{ setCart({ ...cart, req_quantity: value})}}/>
                                </div>  
                                        {/* <Remove onClick={async() => {await quantity > 1 && setQuantity(quantity - 1); setCart({...cart, req_quantity: quantity-1,}); }}/>
                                        {cart.req_quantity<cart.stocks.available_quantity 
                                        ?( <Amount>{quantity}</Amount>):<Amount>{ cart.stocks.available_quantity}</Amount>}
                                        <Add onClick={async() => {
                                                if (quantity < cart.stocks.available_quantity) { await setQuantity(quantity + 1)};
                                                setCart({ ...cart, req_quantity: quantity+1, }); }} /> */}
                                    </AmountContainer>):null} <br/>
                                    <ProductId> <b>Cantidad disponible:</b> {cart.stocks.available_quantity} </ProductId>
                                    <br/><br/>
                                    <ButtonProd onClick={async () => { await props.updateCart(cart); await props.loadCart(); setOpen(false); }}> Actualizar </ButtonProd>                            
                        </InfoContainer>
                
                    </Drawer.Body>
            </Drawer> : null}  
                
            <ContainerCart>
                    <Navbar />
                    <Announcement />
                    {props.cart.length 
                    ? ( <WrapperCart >
                                <TitleCart><b>Carrito de Compras</b></TitleCart>
                                <TopCart>
                                <Link to="/">
                                <button style={{color: "black", background: "transparent", fontSize: 20, textDecorationLine: "underline"}}><b>Continuar Comprando</b></button>
                                </Link>              
                                </TopCart>
                                <BottomCart>              
                                <InfoCart>
                                    { props.cart.map((value) =>                     
                                        <ProductCart >
                                            <ProductDetail>                              
                                                <ImageCart src={value.stocks.product.img} />
                                                <DetailsCart>
                                                    <ProductName><b>Producto:</b>{" "}{value.stocks.product.styles[0].name}{" "}{value.stocks.product.brands[0].name}{" "}{value.stocks.product.categories[0].name} </ProductName>
                                                    <ProductId><b>Ref. </b> {value.stocks.id}</ProductId>
                                                    <ProductColor color={value.stocks.color.color} />
                                                    <ProductSize><b>Talla:</b> {value.stocks.size.size}</ProductSize>
                                                    <TopButtonCart  onClick={ () => { setIdCart(value.id); setOpenDel(true); }}>Eliminar </TopButtonCart>
                                                </DetailsCart>
                                            </ProductDetail>
                                            {value.req_quantity<= value.stocks.available_quantity 
                                            ?(<PriceDetail>                                 
                                                    <ProductAmountContainer>                  
                                                        <ProductAmount> <b>Cantidad: {value.req_quantity}</b> </ProductAmount><br/>
                                                        <EditButton onClick={()=>{ setCart(value); setQuantity(value.req_quantity); setOpen(true); }}>Cambiar{" "}
                                                            <Edit style={{ fontSize: 16 }} ></Edit>
                                                        </EditButton>
                                                    </ProductAmountContainer>             
                                                    <ProductPrice> <b>Precio por unidad: $ {(value.stocks.product.price/ 1000).toFixed(3)}{" "}</b> </ProductPrice>
                                                    <ProductPrice> <b>Subtotal: $ {(value.req_quantity*value.stocks.product.price/ 1000).toFixed(3)}{" "}</b> </ProductPrice>
                                            </PriceDetail>)
                                            : <PriceDetail>                                 
                                                {value.stocks.available_quantity!==0 
                                                ?( <ProductAmountContainer>                   
                                                            <ProductAmount style={{ color: "gainsboro" }} >Cantidad: {value.req_quantity}
                                                                <EditButton onClick={()=>{ setCart(value); setQuantity(value.req_quantity); setOpen(true); }}>Cambiar{" "}
                                                                    <Edit style={{fontSize: 16 }} ></Edit>
                                                                </EditButton>
                                                            </ProductAmount>
                                                    </ProductAmountContainer>)
                                                : <ProductAmount style={{fontSize: 25, fontWeight: "bold" }} ><AssignmentLateSharp style={{color: "black", fontSize: 20}} /> Agotado </ProductAmount>}
                                                    <ProductAmount>La cantidad requerida ya no se encuentra disponible. Actualice la cantidad solicitada o descarte este producto.  <WarningSharp style={{color: "gold", fontSize: 18 }} /> </ProductAmount>                       
                                                    </PriceDetail>}
                                        </ProductCart>)}
                                    <HrCart/>       
                                </InfoCart>                
                                <Summary>
                                    <SummaryTitle>RESUMEN ORDEN</SummaryTitle>
                                    <SummaryItem type="total">
                                        <SummaryItemText>Total</SummaryItemText>
                                    <SummaryItemPrice> $ {(amount / 1000).toFixed(3)} </SummaryItemPrice>
                                    </SummaryItem>   
                                                            
                                    <ButtonCart onClick={async()=>{
                                        await props.loadCart();
                                        //console.log("onLick", stateCart,)
                                        
                                        if(stateCart.length === props.cart.length){                                                                                
                                            // await stateCart.map(async value=> await props.updateStateCart(value.id));
                                            Alert.warning("Los productos seleccionados ya no se encuentran disponibles!", 5000)
                                        } 
                                        else if(stateCart.length){
                                            setOpenNotification(true);
                                        }                                        
                                        else{                                            
                                            await props.cart.map(async value=> await props.updateAmount(value.id));                  
                                            await stateCart.map(async value=> await props.updateStateCart(value.id));
                                            // await props.loadCart();                                    
                                            setOpenModal(true); 
                                        }                                                                
                                    }}>COMPRAR AHORA </ButtonCart>                           
                                </Summary>
                                </BottomCart>                            
                        </WrapperCart>
                    ) 
                    : <div style={{ padding: "20px 0px 200px 0px", display: "flex", flexDirection: "column", textAlign: "center"}}>
                        <h3>Tu carro está vacío</h3>
                        <div style={{padding: "50px 0px 0px 0px"}}>
                            <p style={{fontSize: 18}}>Encuentre las mejores marcas de moda y estilos de ropa al mejor precio.</p>
                        </div>
                        <div style={{padding: 20}}>
                            <Link to="/">
                                    <button style={{color: "black", background: "transparent", fontSize: 20, textDecorationLine: "underline"}}><b>Continuar Comprando</b></button>
                            </Link>
                        </div>
                    </div>
                    }
                <Footer />
            </ContainerCart>
        
            <Contact open={openModal} setOpen={setOpenModal}></Contact>     
            <Notification open={openNotification} setOpen={setOpenNotification}></Notification>  
            <Modal show={openDel} overflow={true} onHide={() => setOpenDel(false)}>  
                    <Modal.Header> <Modal.Title>Eliminar producto</Modal.Title> </Modal.Header>
                    <ModalBody>¿Estas seguro que quieres eliminar este producto?</ModalBody>
                    <ModalFooter>
                        <Button  color= "blue" appearance="ghost" onClick={ async () => {
                                await props.updateStateCart(idCart); 
                                await props.loadCart();
                                setOpenDel(false)}
                        }> Eliminar </Button>{" "}
                        <Button onClick={() => setOpenDel(false)} appearance="subtle"> <b>Cancelar</b> </Button>
                    </ModalFooter>
            </Modal>
        </Fragment>            
  );
};

//leer estados
const mapStateToProps = (state) => ({
    cart: state.cart.cart,      
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
    loadCart: () => dispatch(cartActions.loadCart()),    
    updateCart: (payload) => dispatch(cartActions.updateCart(payload)),  
    updateStateCart: (payload) => dispatch(cartActions.updateStateCart(payload)),  
    updateAmount: (payload) => dispatch(contactActions.updateAmount(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);