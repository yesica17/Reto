import { Sidenav, Dropdown, Icon, Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Link } from "react-router-dom";

const Navigation = ()=>{

    return(

 <div>
    
    <Sidenav defaultOpenKeys={['2']} activeKey="1" expanded={false} appearance='inverse'>
      <Sidenav.Body>
        <Nav>            
          <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
            Inicio
          </Nav.Item>        
          
          <Dropdown eventKey="2" title="Productos" icon={<Icon icon="edit" />}>
              <Link to={`/addproduct`} style={{textDecoration: "none"}}>
            <Dropdown.Item eventKey="2-1">Agregar productos</Dropdown.Item>
            </Link>
            <Link to={`/admin`} style={{textDecoration: "none"}}>
            <Dropdown.Item eventKey="2-2">Consultar productos</Dropdown.Item>
            </Link>
            </Dropdown>
            <Link to={`/`} style={{textDecoration: "none"}}>
            <Nav.Item eventKey="3" icon={<Icon icon="home" />}>
                Salir
          </Nav.Item> </Link>
          {/* <Dropdown
            eventKey="4"
            title="Settings"
            icon={<Icon icon="gear-circle" />}
          >
            <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
            <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
            <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
            <Dropdown.Menu eventKey="4-5" title="Custom Action">
              <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
              <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>);
  };

  export default Navigation;