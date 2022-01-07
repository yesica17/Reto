import * as express from "express";
import { Order } from "../models/Order";
import { Cart } from "../models/Cart";
import { UserContact } from "../models/UserContact";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../controllers/token";

class OrderController {
  public path = "/order";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

    // Controller endpoints
    this.router.post(this.path, this.createOrder);
    this.router.get(this.path, this.getAllOrder);
    this.router.get(this.path + "/:id", this.getOrder);

    this.router.put(this.path + "/:id", this.updateOrder);

    this.router.delete(this.path + "/:id", this.deleteOrder);
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

  //------------Create Order-----------------
  public async createOrder(req: express.Request, res: express.Response) {
    const orderData = req.body;
    const order = new Order();

    const prueba=await UserContact.find({where: { userId: orderData.user.id},});
    
    const contact = prueba.map(value=>value)[0]
    order.contact = contact;  

    

    //console.log(contact.users.id)

    console.log(prueba)

    const orders = await Cart.find({
      where: { userId: orderData.user.id, state_cart: true },
    });
    order.carts = orders;
    order.amount = orders.map((value) => value.amount)
      .reduce((a, b) => a + b, 0);    

    try {
      const savedOrder = await order.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //--------Get all order--------------
  public async getAllOrder(req: express.Request, res: express.Response) {
    const order = await Order.find();
    return res.send(order);
  }

  //---------------Get order---------------
  public async getOrder(req: express.Request, res: express.Response) {
    const order = await Order.findOne(req.params.id);
    return res.send(order);
  }

  //------------------Update order------------------
  public async updateOrder(req: express.Request, res: express.Response) {
    const order = await Order.findOne(req.params.id);
    if (order !== undefined) {
      await Order.update(req.params.id, req.body);
      return res.status(200).send({ message: "Order updated correctly" });
    }

    return res.status(404).send({ message: "Order not found" });
  }

  //-------------------Delete order---------------------
  public async deleteOrder(req: express.Request, res: express.Response) {
    Order.delete(req.params.id);
    return res.status(200).send({ message: "Cart deleted successfully" });
  }
}

export default OrderController;
