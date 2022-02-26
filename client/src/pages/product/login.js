import { Modal, Input } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { FormLogin, ButtonLogin, LinkLogin } from "./style";
import Register from "../register/Register";
import { connect } from "react-redux";
import * as loginActions from "../../store/actions/login";
import { useState, useEffect } from "react";
import ModalBody from "rsuite/lib/Modal/ModalBody";
import ModalFooter from "rsuite/lib/Modal/ModalFooter";


const LoginModal = (props) => {    
        const userInit = {
            email: "",
            password: "",
        };
        const [user, setUser] = useState(userInit);        
        const [open, setOpen] = useState(false);     

        useEffect(() => {            
            if(props.user){
                props.setOpen(false);
            }         
        }, [props.user]);  

        return (
            <div>
                <Modal  size = "xs" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>  
                    <Modal.Header> <Modal.Title><h4>Iniciar sesión</h4></Modal.Title> </Modal.Header>
                    <ModalBody>
                        <FormLogin>
                            <div style={{marginTop: 5, width: 250}}>
                            <Input placeholder="email" onChange={(value) => setUser({ ...user, email: value })}/>
                            </div>
                            <div style={{marginTop: 5, width: 250}}>
                            <Input type="password" placeholder="password"  onChange={(value) =>  setUser({ ...user, password: value })}/>
                            </div>                        
                            <ButtonLogin onClick={async () => {
                                    await props.loginUser(user);  
                                    // if(props.user){
                                    //     props.setOpen(false);   
                                    // }                                                                               
                            }}> INGRESAR </ButtonLogin>  
                            <h5>¿No tienes una cuenta?</h5>      
                            <LinkLogin onClick={()=>{setOpen(true)}}>CREAR UNA CUENTA NUEVA</LinkLogin>                        
                        </FormLogin>                       
                    </ModalBody> 
                    <ModalFooter>                   
                    </ModalFooter>  
                    <Register open={open} setOpen={setOpen}></Register>                                                  
                </Modal>                
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
