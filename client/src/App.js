import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ProductListAdmin from "./admin/pages/ProductList";
import AddProducts from "./admin/pages/AddProducts"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./pages/login/privateRoute";



const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>        
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/register">
          <Register />
        </Route>       
        <PrivateRoute exact path="/admin" component={ProductListAdmin }/> 
        <PrivateRoute exact path="/addproduct" component={AddProducts }/>           
      </Switch>
    </Router>
  );
};

export default App;
