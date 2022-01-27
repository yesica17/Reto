import { ContainerLogin, WrapperLogin, TitleLogin, FormLogin, InputLogin, ButtonLogin, LinkLogin } from "../components/Styled_components";
import Navbar from "../components/Navbar";

import { connect } from "react-redux";

import * as loginActions from "../store/actions/login";

import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";


const Login = (props) => {
  const userInit = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInit);
  const history=useHistory()

  
  
  
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
          
          <Link to="/register">
            <LinkLogin>CREAR UNA CUENTA NUEVA</LinkLogin>
          </Link>
        </FormLogin>
      </WrapperLogin>
    </ContainerLogin>
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
