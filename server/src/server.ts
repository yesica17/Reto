import App from "./App";

import UserController from "./controllers/UserController";
import ProductController from "./controllers/ProductController";
import StockController from "./controllers/StockController";

const controllers = [
  new UserController(),
  new ProductController(),
  new StockController(),
];
const app = new App(controllers, 3000);

app.listen();

export default app;
