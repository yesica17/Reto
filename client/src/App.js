import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductListAdmin from "./admin/pages/ProductList";
import AddProducts from "./admin/pages/AddProducts"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


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
        <Route path="/products/:category">
          <ProductList />
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
        <Route path="/admin">
          <ProductListAdmin />
        </Route>
        <Route path="/addproduct">
          <AddProducts/>
        </Route>       
      </Switch>
    </Router>
  );
};

export default App;
