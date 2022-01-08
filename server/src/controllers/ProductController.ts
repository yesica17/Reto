import * as express from "express";
import { Product } from "../models/Products";
import { Category } from "../models/Categories";
import { Style } from "../models/Styles";
import { Brand } from "../models/Brands";
import { Stock } from "../models/Stock";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../controllers/token";

class ProductController {
  public path = "/product";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

    // Controller endpoints
    this.router.post(this.path, this.createProduct);
    this.router.get(this.path, this.getAllProduct);
    this.router.get(this.path + "/category", this.getAllCategory);
    this.router.get(this.path + "/style", this.getAllStyle);
    this.router.get(this.path + "/brand", this.getAllBrand);
    this.router.get(this.path + "/:id", this.getProduct);
    this.router.put(this.path + "/:id", this.updateProduct);    
    this.router.delete(this.path + "/:id", this.deleteProduct);
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

  //------------Create Product-----------------
  public async createProduct(req: express.Request, res: express.Response) {
    const productData = req.body;
    const product = new Product();
    product.desc = productData.desc;
    product.img = productData.img;
    product.price = productData.price;
    const categories = await Category.findByIds(
      productData.categories.map((value) => value.id)
    );
    product.categories = categories;
    const styles = await Style.findByIds(
      productData.styles.map((value) => value.id)
    );
    product.styles = styles;
    const brands = await Brand.findByIds(
      productData.brands.map((value) => value.id)
    );
    product.brands = brands;

    try {
      const savedProduct = await product.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //--------Get all products--------------
  public async getAllProduct(req: express.Request, res: express.Response) {     
    const products = await Product.find({
      relations: ["stock"],  
      order:{views: "DESC"}    
    });    
    return res.send(products);
  }
  

  //--------Get all category--------------
  public async getAllCategory(req: express.Request, res: express.Response) {
    const categorys = await Category.find();
    return res.send(categorys);
  }

  //--------Get all style--------------
  public async getAllStyle(req: express.Request, res: express.Response) {
    const styles = await Style.find();
    return res.send(styles);
  }

  //--------Get all brand--------------
  public async getAllBrand(req: express.Request, res: express.Response) {
    const brands = await Brand.find();
    return res.send(brands);
  }

  //---------------Get product---------------
  public async getProduct(req: express.Request, res: express.Response) {
    const client = await Product.findOne(req.params.id, {
      relations: ["stock"],
    });
    return res.send(client);
  }

  //------------------Update product------------------
  public async updateProduct(req: express.Request, res: express.Response) {
    const product = await Product.findOne(req.params.id);
    if (product !== undefined) {
      await Product.update(req.params.id, req.body);
      return res.status(200).send({ message: "Product updated correctly" });
    }

    return res.status(404).send({ message: "Product not found" });
  }

  //-------------------Delete product---------------------
  public async deleteProduct(req: express.Request, res: express.Response) {
    Product.delete(req.params.id);
    return res.status(200).send({ message: "Product deleted successfully" });
  }



}

export default ProductController;
