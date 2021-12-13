import {
  ContainerLogin,
  WrapperLogin,
  TitleLogin,
  FormLogin,
  InputLogin,
  ButtonLogin,
  LinkLogin,
} from "../components/Styled_components";

const Login = () => {
  return (
    <ContainerLogin>
      <WrapperLogin>
        <TitleLogin>Iniciar Sesión</TitleLogin>
        <div>
          <InputLogin placeholder="email" />
          <InputLogin placeholder="password" />
          <ButtonLogin onClick={() => console.log("hola")}>
            INGRESAR
          </ButtonLogin>
          <LinkLogin>CREAR UNA CUENTA NUEVA</LinkLogin>
        </div>
      </WrapperLogin>
    </ContainerLogin>
  );
};

export default Login;
