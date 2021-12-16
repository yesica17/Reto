import {
  ContainerLogin,
  WrapperLogin,
  TitleLogin,
  FormLogin,
  InputLogin,
  ButtonLogin,
  LinkLogin,
} from "../components/Styled_components";

import { connect } from "react-redux";

import * as loginActions from "../store/actions/login";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const userInit = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInit);
  const [route, setRoute] = useState("/login");
  return (
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
          <Link to={route}>
            <ButtonLogin
              onClick={async () => {
                await props.loginUser(user);
                if (true) {
                  setRoute("/");
                }
              }}
            >
              INGRESAR
            </ButtonLogin>
          </Link>
          <Link to="/register">
            <LinkLogin>CREAR UNA CUENTA NUEVA</LinkLogin>
          </Link>
        </FormLogin>
      </WrapperLogin>
    </ContainerLogin>
  );
};

//leer estados
const mapStateToProps = (state) => ({});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => dispatch(loginActions.loginUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
