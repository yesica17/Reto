import App from "./App";

import UserController from "./controllers/UserController";
import ProductController from "./controllers/ProductController";
import StockController from "./controllers/StockController";
import CartController from "./controllers/CartController";
import ContactController from "./controllers/ContactController";
import OrderController from "./controllers/OrderController";

const controllers = [
  new UserController(),
  new ProductController(),
  new StockController(),
  new CartController(),
  new ContactController(),
  new OrderController(),
];
const app = new App(controllers, 8000);

app.listen();

export default app;
