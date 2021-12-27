import { ContainerLogin, WrapperLogin, TitleLogin, FormLogin, InputLogin, ButtonLogin,
} from "../components/Styled_components";

import { connect } from "react-redux";

import * as contactActions from "../store/actions/contact";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = (props) => {
  const contactInit = {
    state: "",
    city: "",
    adress: "",
  };
  const [contact, setContact] = useState(contactInit);

  return (
    <ContainerLogin>
      <WrapperLogin>
        <TitleLogin>Dirección de contacto</TitleLogin>
        <FormLogin>
          <InputLogin
            placeholder="Departamento"
            onChange={(value) =>
              setContact({ ...contact, state: value.target.value })
            }
          />
          <InputLogin
            placeholder="Ciudad"
            onChange={(value) =>
              setContact({ ...contact, city: value.target.value })
            }
          />
          <InputLogin
            placeholder="Dirección"
            onChange={(value) =>
              setContact({ ...contact, adress: value.target.value })
            }
          />
          <Link to="/order">
            <ButtonLogin
              onClick={async () => {
                await props.createContact(contact);
              }}
            >
              Siguiente
            </ButtonLogin>
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
  createContact: (payload) => dispatch(contactActions.createContact(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
