import { FormRegister, InputRegister, AgreementRegister, ButtonRegister, FilterID, FilterIDOption, Error } from "./style";
import { Drawer, Tooltip, Whisper, Alert} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { connect } from "react-redux";
import * as optionsActions from "../../store/actions/options";
import { useState, useEffect } from "react";


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

            <Drawer   style={{background: "yellow"}} placement='left' size='sm' show={props.open} onHide={() => props.setOpen(false)}>
                <Drawer.Header><Drawer.Title><h3><b>Crear una cuenta</b></h3></Drawer.Title></Drawer.Header>
                <Drawer.Body>
                    <FormRegister onSubmit={handleSubmit}>
                        <FilterID  required={true} onChange={(value) => setUser({ ...user, type_document: { id: value.target.value } })}>
                        <FilterIDOption value={0} disabled selected>Tipo de documento</FilterIDOption>
                        {props.typeDocument.length
                        ? props.typeDocument.map((value) => (
                        <FilterIDOption value={value.id} key={value.id}>{value.type_document}</FilterIDOption>))
                        : null}
                        </FilterID>
                        <Whisper trigger="hover" placement= "bottom"
                            speaker={<Tooltip>Introduzca sólo caracteres númericos </Tooltip>}>
                            <InputRegister
                                type="number" required={true}
                                placeholder="número documento"
                                onChange={(value) => setUser({ ...user, document: value.target.value })}
                                />
                        </Whisper>                 
                        <InputRegister type="text"  required={true} placeholder="escribe tu nombre"  pattern="^[A-Za-z]+$"
                            onChange={(value) => setUser({ ...user, name: value.target.value })}/>
                        <Error>Introduzca sólo caracteres alfabéticos.</Error>
                        <InputRegister type="text"  required={true} placeholder="escribe tus apellidos" pattern="^[A-Za-z]+$"
                            onChange={(value) => setUser({ ...user, lastname: value.target.value })}/>
                        <Error>Introduzca sólo caracteres alfabéticos.</Error>
                        <InputRegister type="email" required={true} placeholder="email" 
                            onChange={(value) => setUser({ ...user, email: value.target.value })}/>
                        <Error>Introduzca una dirección de email válida.</Error>
                        <InputRegister type="password" required={true} placeholder="password" 
                            onChange={(value) => setUser({ ...user, password: value.target.value })}
                            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9^&*]{5,20}$"/>
                        <Error> La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números. </Error>
                        <InputRegister type="password" required={true} placeholder="confirmar password" pattern={user.password} />
                        <Error>Las contraseñas no coinciden.</Error>
                        <AgreementRegister>
                            Al crear esta cuenta, acepto el procesamiento de mis datos
                            personales de acuerdo con los términos y condiciones de las{" "}
                            <b>POLÍTICAS PRIVADAS</b>
                        </AgreementRegister>
                        <ButtonRegister onClick={async () =>                         
                        { if(user.type_document.id !== null ) {
                                await props.createUser(user); props.setOpen(false)}else{
                                Alert.warning("Todos los campos son requeridos", 4000)

                            }}
                        }> CREAR </ButtonRegister>
                    </FormRegister>
                </Drawer.Body>
            </Drawer>            
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
