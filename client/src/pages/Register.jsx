import {
  ContainerRegister,
  WrapperRegister,
  TitleRegister,
  FormRegister,
  InputRegister,
  AgreementRegister,
  ButtonRegister,
  FilterID,
  FilterIDOption,
} from "../components/Styled_components";

const Register = () => {
  return (
    <ContainerRegister>
      <WrapperRegister>
        <TitleRegister>CREAR UNA CUENTA</TitleRegister>
        <FormRegister>
          <FilterID>
            <FilterIDOption disabled selected>
              Tipo de documento
            </FilterIDOption>
            <FilterIDOption>Tarjeta de Identidad</FilterIDOption>
            <FilterIDOption>Cédula de Ciudadanía</FilterIDOption>
          </FilterID>
          <InputRegister placeholder="No. documento" />
          <InputRegister placeholder="Nombre" />
          <InputRegister placeholder="Apellidos" />
          <InputRegister placeholder="email" />
          <InputRegister placeholder="password" />
          <InputRegister placeholder="confirmar password" />
          <AgreementRegister>
            Al crear esta cuenta, acepto el procesamiento de mis datos
            personales de acuerdo con los términos y condiciones de las{" "}
            <b>POLÍTICAS PRIVADAS</b>
          </AgreementRegister>
          <ButtonRegister>CREAR</ButtonRegister>
        </FormRegister>
      </WrapperRegister>
    </ContainerRegister>
  );
};

export default Register;
