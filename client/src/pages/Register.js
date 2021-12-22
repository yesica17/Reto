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
  StyledError,
  Error,
} from "../components/Styled_components";

import { connect } from "react-redux";

import * as optionsActions from "../store/actions/options";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const userInit = {
    document: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    type_document: {
      id: null,
    },
  };

  useEffect(() => {
    props.loadTypeDocument();
  }, []);

  const [user, setUser] = useState(userInit);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ContainerRegister>
      <WrapperRegister>
        <TitleRegister>CREAR UNA CUENTA</TitleRegister>
        <FormRegister onSubmit={handleSubmit}>
          <FilterID
            onChange={(value) =>
              setUser({ ...user, type_document: { id: value.target.value } })
            }
          >
            <FilterIDOption value={0} disabled selected>
              Tipo de documento
            </FilterIDOption>

            {props.typeDocument.length
              ? props.typeDocument.map((value) => (
                  <FilterIDOption value={value.id} key={value.id}>
                    {value.type_document}
                  </FilterIDOption>
                ))
              : null}
          </FilterID>

          <InputRegister
            type="number"
            placeholder="No. documento"
            onChange={(value) =>
              setUser({ ...user, document: value.target.value })
            }
            required={true}
          />
          <InputRegister
            type="text"
            placeholder="Nombre"
            required={true}
            onChange={(value) => setUser({ ...user, name: value.target.value })}
          />

          <Error>
            Username should be textual characters and shouldn't include any
            special character!,
          </Error>
          <InputRegister
            type="text"
            placeholder="Apellidos"
            onChange={(value) =>
              setUser({ ...user, lastname: value.target.value })
            }
            required={true}
          />
          <Error>
            Username should be textual characters and shouldn't include any
            special character!,
          </Error>
          <InputRegister
            type="email"
            placeholder="email"
            onChange={(value) =>
              setUser({ ...user, email: value.target.value })
            }
            required={true}
          />
          <Error>It should be a valid email address!</Error>

          <InputRegister
            type="password"
            placeholder="password"
            onChange={(value) =>
              setUser({ ...user, password: value.target.value })
            }
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
            required={true}
          />
          <Error>
            Password should be 8-20 characters and include at least 1 letter, 1
            number and 1 special character!
          </Error>
          <InputRegister
            type="password"
            placeholder="confirmar password"
            pattern={user.password}
            required={true}
          />
          <Error>Passwords don't match!</Error>
          <AgreementRegister>
            Al crear esta cuenta, acepto el procesamiento de mis datos
            personales de acuerdo con los términos y condiciones de las{" "}
            <b>POLÍTICAS PRIVADAS</b>
          </AgreementRegister>

          <ButtonRegister onClick={async () => await props.createUser(user)}>
            CREAR
          </ButtonRegister>
        </FormRegister>
      </WrapperRegister>
    </ContainerRegister>
  );
};

//leer estados
const mapStateToProps = (state) => ({
  typeDocument: state.options.typeDocument,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  loadTypeDocument: () => dispatch(optionsActions.loadTypeDocument()),
  createUser: (payload) => dispatch(optionsActions.createUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
