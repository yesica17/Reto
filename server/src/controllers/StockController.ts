import * as express from "express";
import { Stock } from "../models/Stock";
import { Size } from "../models/Sizes";
import { Color } from "../models/Colors";
import { Product } from "../models/Products";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../controllers/token";

class StockController {
  public path = "/stock";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

    // Controller endpoints
    this.router.post(this.path, this.createStock);
    this.router.get(this.path, this.getAllStock);
    this.router.get(this.path + "/:id", this.getStock);

    this.router.put(this.path + "/:id", this.updateStock);

    this.router.delete(this.path + "/:id", this.deleteStock);
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

  //------------Create Stock-----------------
  public async createStock(req: express.Request, res: express.Response) {
    const stockData = req.body;
    const stock = new Stock();
    stock.available_quantity = stockData.available_quantity;
    const sizes = await Size.findByIds(
      stockData.sizes.map((value) => value.id)
    );
    stock.sizes = sizes;

    const colors = await Color.findByIds(
      stockData.colors.map((value) => value.id)
    );
    stock.colors = colors;

    const products = await Product.findByIds(
      stockData.products.map((value) => value.id)
    );
    stock.products = products;

    try {
      const savedStock = await stock.save();
      res.status(200).json(savedStock);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //--------Get all stock--------------
  public async getAllStock(req: express.Request, res: express.Response) {
    const stock = await Stock.find({
      relations: ["products"],
    });
    return res.send(stock);
  }

  //---------------Get stock---------------
  public async getStock(req: express.Request, res: express.Response) {
    const stock = await Stock.findOne(req.params.id);
    return res.send(stock);
  }

  //------------------Update stock------------------
  public async updateStock(req: express.Request, res: express.Response) {
    const stock = await Stock.findOne(req.params.id);
    if (stock !== undefined) {
      await Stock.update(req.params.id, req.body);
      return res.status(200).send({ message: "Stock updated correctly" });
    }

    return res.status(404).send({ message: "Stock not found" });
  }

  //-------------------Delete product---------------------
  public async deleteStock(req: express.Request, res: express.Response) {
    Stock.delete(req.params.id);
    return res.status(200).send({ message: "Stock deleted successfully" });
  }
}

export default StockController;
