import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined} from "@material-ui/icons";
import { ContainerNavbar, WrapperNavbar, LeftNavbar, ButtonNavbar, CenterNavbar, RightNavbar, MenuItemNavbar,
} from "./Styled_components";
import { Dropdown, Tooltip, Whisper, Button, Icon} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as loginActions from "../store/actions/login";
import * as cartActions from "../store/actions/cart";

const Navbar = (props) => {

//     useEffect(() => {        
//     props.loadCart();      
//   }, []);  
  
  const len = props.cart.length;
  const history=useHistory()
  
  return (
    <ContainerNavbar>
      <WrapperNavbar style={{background:"black"}}>
        <LeftNavbar>
         {props.user ?
            props.user.isAdmin === true 
            ? <Link to={`/admin`}><Button appearance="ghost" color="cyan">
                <Icon icon="user"  /> Administrar productos
               </Button></Link>
            : null
            :null}
        </LeftNavbar>         
        <CenterNavbar>
          <Link to={`/`}>
            <ButtonNavbar>Cidenet Shop</ButtonNavbar>
          </Link>
        </CenterNavbar>
        <RightNavbar>
          {props.user ?
          <Dropdown title={"Hola, "+props.user.name} >
            <Dropdown.Item onSelect={()=>{props.logoutUser()}}>Salir</Dropdown.Item>            
        </Dropdown>
        :<Dropdown title="Ingresar" onClick={()=>{history.push("/login")}}/>                      
        }
        {props.user ?
          <Link to="/cart">
            <MenuItemNavbar>
              <Badge badgeContent={len} color="primary">
                <ShoppingCartOutlined style={{color:"CornflowerBlue"}}/>
              </Badge>
            </MenuItemNavbar>
          </Link>
           : <Whisper
                trigger="click"
                placement= "bottomRight"
                speaker={
                  <Tooltip>El carrito esta vacío</Tooltip>}>
                <MenuItemNavbar>              
                <ShoppingCartOutlined/>            
            </MenuItemNavbar>
              </Whisper> }
        </RightNavbar>
      </WrapperNavbar>
    </ContainerNavbar>
  );
};

//leer estados
const mapStateToProps = (state) => ({ 
  cart: state.cart.cart,
  user: state.login.user,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(loginActions.logoutUser()),  
  loadCart: () => dispatch(cartActions.loadCart()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
