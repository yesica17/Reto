import { Sidenav, Dropdown, Icon, Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Link } from "react-router-dom";

const Navigation = ()=>{

        return(
            
            <div>            
                <Sidenav defaultOpenKeys={['2']} activeKey="1" expanded={false} appearance='inverse'>
                    <Sidenav.Body>
                        <Nav>            
                        {/* <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}> Inicio </Nav.Item>                       */}
                        <Dropdown eventKey="2" title="Productos" icon={<Icon icon="edit" />}>
                            <Link to={`/addproduct`} style={{textDecoration: "none"}}>
                                <Dropdown.Item eventKey="2-1">Agregar productos</Dropdown.Item>
                            </Link>
                            <Link to={`/admin`} style={{textDecoration: "none"}}>
                                <Dropdown.Item eventKey="2-2">Consultar productos</Dropdown.Item>
                            </Link>
                                </Dropdown>
                            <Link to={`/`} style={{textDecoration: "none"}}>
                                <Nav.Item eventKey="3" icon={<Icon icon="home" />}> Salir </Nav.Item> 
                            </Link>        
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        );
};

  export default Navigation;