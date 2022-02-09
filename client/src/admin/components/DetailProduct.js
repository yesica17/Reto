import { Modal, Table, Sidenav, Dropdown, Nav} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Delete, Edit, ArrowBack} from "@material-ui/icons";

import { connect } from "react-redux";
import * as productActions from "../../store/actions/product";
import * as homeActions from "../../store/actions/home";
import { useState, useEffect, Fragment } from "react";

import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import UpdateStock from './UpdateStock';
import ModalDelete from './ModalDelete';

const { Column, HeaderCell, Cell, Pagination } = Table;

const DetailProduct = (props) => {   

    useEffect(() => {  
        props.loadStockDto();  
        props.loadProductsDto();             
    }, []);  

    const newProducts= props.productsDto;
    const newStock = props.stockDto;
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState({});  
    const [openDel, setOpenDel] = useState(false);

    return (
        <Fragment>
            <Modal size= "md" show={props.open} overflow={true} onHide={() => props.setOpen(false)}>
                <Modal.Header>
                    <Modal.Title><div style={{display: "flex", flexDirection: "row"}}><ArrowBack onClick={()=>props.setOpen(false)}/><div style={{marginLeft: 20}}><h5>Detalle del producto</h5></div></div></Modal.Title>
                </Modal.Header>  
                <ModalBody>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div><img style={{height: 200}} src= {props.value.img}/></div> 
                        {/* <div style={{display: "flex", flexDirection: "column", marginLeft: 20, marginRight: 40}}>
                            <div style={{padding: 2, fontSize: 16}}><b>Tipo de prenda: </b>{props.value.style}</div>
                            <div style={{padding: 2, fontSize: 16}}><b>Género: </b>{props.value.category}</div>
                            <div style={{padding: 2, fontSize: 16}}><b>Marca: </b>{props.value.brand}</div>
                            <div style={{padding: 2, fontSize: 16, textAlign: "justify"}}><b>Descripción: </b>{props.value.desc}</div>
                            <div style={{padding: 2, fontSize: 16}}><b>Precio: $ </b>{(props.value.price / 1000).toFixed(3)}</div></div> */}
                            <Sidenav style={{background: "transparent", color: "red"}} activeKey="1" expanded={true} appearance='default'>
                                <Sidenav.Body>
                                    <Nav>            
                                        <Nav.Item eventKey="2"><b>Tipo de prenda: </b>{props.value.style}
                                        </Nav.Item>  
                                        <Nav.Item eventKey="3"><b>Género: </b>{props.value.category}
                                        </Nav.Item> 
                                        <Nav.Item eventKey="4"><b>Marca: </b>{props.value.brand}
                                        </Nav.Item>           
                                        <Dropdown eventKey="5" title="Descripción"> 
                                        <Dropdown.Item eventKey="5-1">{props.value.desc}</Dropdown.Item>     
                                        </Dropdown> 
                                        <Nav.Item eventKey="6"><b>Precio: $</b>{(props.value.price / 1000).toFixed(3)}
                                        </Nav.Item>             
                        
                                    </Nav>
                                </Sidenav.Body>
                            </Sidenav>
                        </div>
                        <Table height={400} data={newStock.filter(value=>value.id_product === props.value.id_product)}  sortType='asc'>
                            <Column width={70} align="center" resizable>
                            <HeaderCell><h6><b>Ref.</b></h6></HeaderCell>
                            <Cell dataKey="id_stock" />
                            </Column>         

                            <Column width={200} align="center" resizable>
                            <HeaderCell><h6><b>Color</b></h6></HeaderCell>
                            <Cell dataKey="color_spa" />
                            </Column>

                            <Column width={70} align="center" resizable>
                            <HeaderCell><h6><b>Talla</b></h6></HeaderCell>
                            <Cell dataKey="size" />
                            </Column>

                            <Column width={200} align="center" resizable>
                            <HeaderCell><h6><b>Cantidad disponible</b></h6></HeaderCell>
                            <Cell dataKey="available_quantity" />
                            </Column>

                            <Column width={120} fixed="right">
                            <HeaderCell></HeaderCell>
                            <Cell>
                                {rowData => {
                                function handleAction() {
                                    console.log(rowData);
                                }
                                return (
                                    <span>
                                    <a onClick={()=>{setRowData(rowData); setOpen(true)}}> <Edit style={{color: "LightSlateGray", fontSize: 20, cursor: "pointer"}}/> </a> |{' '}
                                    <a onClick={()=>{setRowData(rowData); setOpenDel(true)}}> <Delete style={{color: "Tomato", fontSize: 20, cursor: "pointer"}}/></a>
                                    </span>
                                );
                                }}
                            </Cell>
                            </Column>
                        </Table>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
            <UpdateStock open={open} setOpen={setOpen} rowData={rowData}/> 
            <ModalDelete openDel={openDel} setOpenDel={setOpenDel} rowData={rowData}/> 
        </Fragment>
        );
};


 //leer estados
const mapStateToProps = (state) => ({  
  productsDto: state.home.productsDto,  
  stockDto: state.product.stockDto,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({  
  loadProductsDto: () => dispatch(homeActions.loadProductsDto()), 
  loadStockDto: () => dispatch(productActions.loadStockDto()),
  updateProductStatus: (payload) => dispatch(productActions.updateProductStatus(payload)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);