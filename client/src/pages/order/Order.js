import { ProductOrder, ButtonOrder, InfoOrder, ProductDetailOrder, ImageOrder, ProductTitle, PriceOrder, DetailsOrder } from "./style";

import { connect } from "react-redux";

import * as orderActions from "../../store/actions/order";
import * as cartActions from "../../store/actions/cart";

import { useState, useEffect } from "react";
import { useHistory  } from "react-router-dom";
import { Modal, Button, Alert} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import AlertOrder from "./alert";
import ModalBody from "rsuite/lib/Modal/ModalBody";


let stateCart = [];

const Order = (props) => {      
    
    // useEffect(() => {            
    //     props.loadCart();                        
    // }, []);  

    //const firstUpdate = useRef(true);

    const createOrder=async()=>{
            await props.createOrder();
            await props.cart.map((value) => props.updateStock(value.id));
            await props.setOpen(false);    
            await props.sendEmail(infoEmail);                        
    }

    const [firstUpdate, setFirstUpdate] = useState(false);     
    const history=useHistory();       

    useEffect(() => {   

        if(props.open && firstUpdate){               
        stateCart=props.cart.filter( value=>value.req_quantity > value.stocks.available_quantity);
        if(stateCart.length){
            Alert.warning("Lo sentimos. Alguno(s) de los productos seleccionados ya no se encuentran disponibles", 5000);
            props.setOpen(false)         
        }else{
            createOrder();                            
            history.push("/");
        }}                 
    }, [props.cart]);   

    const data = {
            email: "",
            user: "",
            order: null,
            address: "",
            amount: null,
            products: []    
        };   

    const [infoEmail, setInfoEmail] = useState(data);   
    const [openNotification, setOpenNotification] = useState(false); 
    
    
    useEffect(() => {    

            if(props.cart && props.contact && props.user && props.amount){
                const title = props.cart.map(value=>value.stocks.product.styles[0].name+" "+ value.stocks.product.brands[0].name + " " + value.stocks.product.categories[0].name + " " +"x" + " " + value.req_quantity + " " + "ud.");             
                const name = props.user.name;
                const email = props.user.email;
                const address = props.contact.map(c=>c.state+", "+c.city+", "+c.adress)[0];                
                const amount = props.amount.amount;                                
                setInfoEmail({...infoEmail, user: name, products: title, address: address, amount: amount, email: email});     
            }              
    }, [props.contact, props.amount])  

    return (
        <Modal show={props.open} overflow={(true)} size ="sm" onHide={() => props.setOpen(false)} onExit={async()=>await props.loadCart()}>  
            <Modal.Header> <Modal.Title>Resumen del pedido</Modal.Title> </Modal.Header><br/>
            {props.cart.length ? 
                <ModalBody>
                <InfoOrder>
                    { props.cart.map((value) =>                     
                        <ProductOrder >
                            <ProductDetailOrder>                              
                                <ImageOrder src={value.stocks.product.img} />
                                <DetailsOrder>
                                    <ProductTitle> <b>Producto:</b>{" "}{value.stocks.product.styles[0].name}{" "}{value.stocks.product.brands[0].name}{" "}{value.stocks.product.categories[0].name} </ProductTitle>
                                    <ProductTitle> <b>Color:</b>{" "}{value.stocks.color.color_spa} </ProductTitle>
                                    <ProductTitle> <b>Talla:</b> {value.stocks.size.size} </ProductTitle>
                                </DetailsOrder>
                            </ProductDetailOrder>
                                <PriceOrder >
                                    <DetailsOrder>                         
                                            <ProductTitle> <b>Cantidad x {value.req_quantity}</b>
                                            </ProductTitle><br/> <ProductTitle> <b>Precio por unidad: $ {(value.stocks.product.price/ 1000).toFixed(3)}{" "}</b> </ProductTitle><br/>  
                                    </DetailsOrder>   
                                </PriceOrder >
                        </ProductOrder>)}                           
                </InfoOrder>               
                <div style={{margin: 20}}>                    
                    <ButtonOrder onClick={ async () => {  
                        setFirstUpdate(true);                       
                        await props.loadCart();                                                                         
                     }}> Confirmar compra</ButtonOrder>{" "}
                    <Button onClick={() => props.setOpen(false)} appearance="subtle"> <b>Cancelar</b> </Button>
                </div>
                </ModalBody>: null}                 
            <AlertOrder open={openNotification} setOpen={setOpenNotification}></AlertOrder>     
        </Modal>);  
};

//leer estados
const mapStateToProps = (state) => ({ 
    cart: state.cart.cart, 
    user: state.login.user, 
    contact: state.contact.contact, 
    amount: state.order.order,   
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  createOrder: () => dispatch(orderActions.createOrder()),  
  updateStock: (payload) => dispatch(orderActions.updateStock(payload)),    
  sendEmail: (payload) => dispatch(orderActions.sendEmail(payload)),  
  loadCart: () => dispatch(cartActions.loadCart()),       
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
