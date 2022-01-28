import { ContainerLogin, WrapperLogin, TitleLogin, FormLogin, InputLogin, ButtonLogin, LinkLogin } from "../components/Styled_components";
import Navbar from "../components/Navbar";

import { connect } from "react-redux";

import * as loginActions from "../store/actions/login";

import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Register from "./Register";


const Login = (props) => {
  const userInit = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInit);
  const history=useHistory();

  const [open, setOpen] = useState(false);    
  console.log(props.user)
  return (
    <div>
      <Navbar/>
    <ContainerLogin>      
      <WrapperLogin>
        <TitleLogin>Iniciar Sesión</TitleLogin>
        <FormLogin>
          <InputLogin
            placeholder="email"
            onChange={(value) =>
              setUser({ ...user, email: value.target.value })
            }
          />
          <InputLogin
            placeholder="password"
            onChange={(value) =>
              setUser({ ...user, password: value.target.value })
            }
          />
          
            <ButtonLogin onClick={async () => {
                await props.loginUser(user);
                if(props.user){
                  history.push("/");
                }                
                }}> INGRESAR </ButtonLogin>  

            <h5>¿No tienes una cuenta?</h5>      
            <LinkLogin onClick={()=>{setOpen(true)}}>CREAR UNA CUENTA NUEVA</LinkLogin>
          
        </FormLogin>
      </WrapperLogin>
    </ContainerLogin>
    <Register open={open} setOpen={setOpen}></Register>
    </div>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  user: state.login.user,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => dispatch(loginActions.loginUser(payload)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
