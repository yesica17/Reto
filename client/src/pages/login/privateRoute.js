import { useState, useEffect } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import * as loginActions from "../../store/actions/login";
import ProductList from "../../admin/pages/ProductList";
import AddProducts from "../../admin/pages/AddProducts";


const PrivateRoute =({component: Component, user, ...rest}) =>{

    return (
     
    // <Route exact={props.exact} path={props.path} component={props.component}>
    //     { props.user ? props.user.isAdmin ? <ProductList/> : <Link to="/login"/>: <Redirect to="/"/>} </Route>
    
    <Route {...rest}>
        { user ? user.isAdmin ? <Component/> : <Link to="/login"/>: <Redirect to="/"/>} </Route>
    )  

};

//leer estados
const mapStateToProps = (state) => ({   
  user: state.login.user,
});

//ejecutar acciones
const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(loginActions.logoutUser()),    
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);