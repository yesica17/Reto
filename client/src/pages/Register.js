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
    type_document: {
      id: null,
    },
  };

  useEffect(() => {
    props.loadTypeDocument();
  }, []);

  const [user, setUser] = useState(userInit);

  return (
    <ContainerRegister>
      <WrapperRegister>
        <TitleRegister>CREAR UNA CUENTA</TitleRegister>
        <div>
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
            placeholder="No. documento"
            onChange={(value) =>
              setUser({ ...user, document: value.target.value })
            }
          />
          <InputRegister
            placeholder="Nombre"
            onChange={(value) => setUser({ ...user, name: value.target.value })}
          />
          <InputRegister
            placeholder="Apellidos"
            onChange={(value) =>
              setUser({ ...user, lastname: value.target.value })
            }
          />
          <InputRegister
            placeholder="email"
            onChange={(value) =>
              setUser({ ...user, email: value.target.value })
            }
          />
          <InputRegister
            placeholder="password"
            onChange={(value) =>
              setUser({ ...user, password: value.target.value })
            }
          />
          <InputRegister placeholder="confirmar password" />
          <AgreementRegister>
            Al crear esta cuenta, acepto el procesamiento de mis datos
            personales de acuerdo con los términos y condiciones de las{" "}
            <b>POLÍTICAS PRIVADAS</b>
          </AgreementRegister>
          <Link to={"/login"}>
            <ButtonRegister onClick={async () => await props.createUser(user)}>
              CREAR
            </ButtonRegister>
          </Link>
        </div>
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
