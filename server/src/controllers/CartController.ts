import * as express from "express";
import { Cart } from "../models/Cart";
import { Stock } from "../models/Stock";
import { User } from "../models/User";
import { getConnection } from "typeorm";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../controllers/token";
import { Order } from "../models/Order";

class CartController {
  public path = "/cart";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

    // Controller endpoints
    this.router.post(this.path, this.createCart);
    this.router.get(this.path, this.getAllCart);
    this.router.get(this.path + "/:id", this.getCart);

    this.router.put(this.path + "/:id", this.updateCart);

    this.router.delete(this.path + "/:id", this.deleteCart);
  }

  public validateInput(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const params = { id: req.url.split("/")[2] };
    switch (req.method) {
      case "GET":
        break;
      case "DELETE":
        if (!params.id) {
          return res.status(400).send({ message: "Id is required" });
        }
        break;
      case "POST":
        if (Object.keys(req.body).length === 0) {
          return res
            .status(400)
            .send({ message: "Request body can't be empty" });
        }
        break;
      case "PUT":
        if (!params.id) {
          return res.status(400).send({ message: "Id is required" });
        }
        if (Object.keys(req.body).length === 0) {
          return res
            .status(400)
            .send({ message: "Request body can't be empty" });
        }
        break;
    }
    next();
  }

  //------------Create Cart-----------------
  public async createCart(req: express.Request, res: express.Response) {
    const cartData = req.body;
    const cart = new Cart();
    cart.req_quantity = cartData.req_quantity;
    cart.state_cart = cartData.state_cart;
    const stocks = await Stock.findByIds(
      cartData.stocks.map((value) => value.id)
    );
    cart.stocks = stocks;
    const user = await User.findOne(cartData.user.id);
    cart.user = user;

    const order = await Order.findOne(cartData.order.id);
    cart.order = order;

    try {
      const savedCart = await cart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //--------Get all cart--------------
  public async getAllCart(req: express.Request, res: express.Response) {
    const cart = await Cart.find();
    return res.send(cart);
  }

  //---------------Get cart---------------
  public async getCart(req: express.Request, res: express.Response) {
    const cart = await Cart.findOne(req.params.id);
    return res.send(cart);
  }

  //------------------Update cart and stock------------------
  public async updateCart(req: express.Request, res: express.Response) {
    const cartData = req.body;
    const cart = await Cart.findOne(req.params.id);

    if (cart !== undefined) {
      await Cart.update(req.params.id, cartData);

      const require = cart.req_quantity;
      const stock = await Stock.find({
        select: ["available_quantity"],
        where: [{ id: cart.stocks[0].id }],
      });
      const available = stock[0].available_quantity;
      const newStock = available - require;
      console.log(newStock);

      await Stock.update(cart.stocks[0].id, { available_quantity: newStock });

      return res.status(200).send({ message: "Cart updated correctly" });
    }

    return res.status(404).send({ message: "Cart not found" });
  }

  //-------------------Delete cart---------------------
  public async deleteCart(req: express.Request, res: express.Response) {
    Cart.delete(req.params.id);
    return res.status(200).send({ message: "Cart deleted successfully" });
  }
}

export default CartController;
