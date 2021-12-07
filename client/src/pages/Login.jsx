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
        <FormLogin>
          <InputLogin placeholder="email" />
          <InputLogin placeholder="password" />
          <ButtonLogin>INGRESAR</ButtonLogin>
          <LinkLogin>CREAR UNA CUENTA NUEVA</LinkLogin>
        </FormLogin>
      </WrapperLogin>
    </ContainerLogin>
  );
};

export default Login;
