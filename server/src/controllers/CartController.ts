import * as express from "express";
import { Cart } from "../models/Cart";
import { Stock } from "../models/Stock";
import { User } from "../models/User";
import * as nodemailer from "nodemailer";

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
    this.router.post(this.path + "/load", this.getAllCart);
    this.router.get(this.path + "/:id", this.getCart);

    this.router.put(this.path + "/:id", this.updateCart);
    this.router.put(this.path + "/quantity"+"/:id", this.updateQuantity);
    this.router.put(this.path + "/amount"+"/:id", this.updateAmount);
    this.router.put(this.path + "/state"+"/:id", this.updateState);

    this.router.delete(this.path + "/:id", this.deleteCart);
    this.router.post(this.path + "/email", this.sendEmail);
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

    const stock = await Stock.find({
      select: ["id"],
      where: [
        {
          sizeId: cartData.size.id,
          colorId: cartData.color.id,
          productId: cartData.product.id,
        },
      ],
    });
    cart.stocks=stock[0];

    const findStock = await Cart.find({where: [{stockId: stock[0], state_cart: true }]});   
   
    const user = await User.findOne(cartData.user.id);
    cart.user = user;

    const order = await Order.findOne(cartData.order.id);
    cart.order = order;

    try {
      if (findStock.length===0){const savedCart = await cart.save();
      res.status(200).json(savedCart);}else{
        res.send(true)
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //--------Get all cart by id_user and state:true--------------
  public async getAllCart(req: express.Request, res: express.Response) {
    const cartData = req.body;
    const cart = await Cart.find({
      relations: ["stocks"],
      where: [
        {
          userId: cartData.user.id,
          state_cart: true,
        },
      ],
    });
    return res.send(cart);
  }

  //--------Update quantity cart--------------
  public async updateQuantity(req: express.Request, res: express.Response) {
    const cartData = req.body;
    const cart = await Cart.findOne(req.params.id);
   if (cart !== undefined) {
      await Cart.update(req.params.id, cartData);           
      return res.status(200).send({ message: "Cart updated correctly" });
    }
    return res.status(404).send({ message: "Cart not found" });
  } 

  //------------Select cart by order---------------
   public async updateState(req: express.Request, res: express.Response) {
    const cartData = req.body;
    const cart = await Cart.findOne(req.params.id);
   if (cart !== undefined) {
      await Cart.update(req.params.id, cartData);           
      return res.status(200).send({ message: "Cart updated correctly" });
    }
    return res.status(404).send({ message: "Cart not found" });
  } 

  //--------Update amount cart--------------
  public async updateAmount(req: express.Request, res: express.Response) {    
    const cartData = req.body;
    const cart = await Cart.findOne(req.params.id);
   if (cart !== undefined) { 
      await Cart.update(req.params.id, cartData);           
      await Cart.update(req.params.id, { amount: cart.stocks.product.price*cart.req_quantity});   
      
      return res.status(200).send({ message: "Cart updated correctly" });
    }
    return res.status(404).send({ message: "Cart not found" });
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
        where: [{ id: cart.stocks.id }],
      });
      const available = stock[0].available_quantity;       
      const newStock = available - require;
     

      await Stock.update(cart.stocks.id, { available_quantity: newStock });

      return res.status(200).send({ message: "Cart updated correctly" });
    }

    return res.status(404).send({ message: "Cart not found" });
  }

  //-------------------Delete cart---------------------
  public async deleteCart(req: express.Request, res: express.Response) {
    Cart.delete(req.params.id);
    return res.status(200).send({ message: "Cart deleted successfully" });
  }

  //-------------------Send email---------------------
  public async sendEmail(req: express.Request, res: express.Response) {
    const data=req.body;

    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'yriosbedoya@gmail.com',
        pass: 'iofcygwhacaffseb'
    },
  });  

  const user= data.user;
  const order=data.order;
  
  let obj = {
    campo: [
        {
            anotacion: "Camiseta manga corta Mujer Americanino",
            fechat: "2",
            fechac: "3",
            resultado: "4"
        },
        {
            anotacion: "Camiseta manga corta Hombre Levis",
            fechat: "6",
            fechac: "7",
            resultado: "8"
        }
    ]
}  

    let cadena="";
    const prueba=obj.campo.forEach(value=>{ 
      cadena+=value.anotacion;  
      cadena+=" - ";
      return cadena
    });


  let mailOptions = await transporter.sendMail({
    from: '"Cidenet Shop" <yriosbedoya@gmail.com>', // sender address
    to: "yriosbedoya@gmail.com", // list of receivers
    subject: "Detalle de la compra", // Subject line
    // text: "Hello world?", // plain text body    
    html: `<div>
    <div style="background-color: black; height: 30px;">--</div>
    <div style="text-align: center;"><h1>CidenetShop</h1></div><hr/>
    <p style="font-size: 14px;">Hola, <b>${user}</b></p>
    <p style="font-size: 14px;">Gracias por comprar en <b>CidenetShop</b></p>
    <p style="font-size: 14px;">Tu pedido ha sido aprobado. Recuerda que el tiempo de entrega inicia a partir de este momento.</p>    
    <table border="1" style="width:100%;">
    <tr><th>Información del pedido</th></tr>
    <tr><td><b>Pedido N° </b>${order}</td></tr>  
    <tr><td><b>Realizado el </b>26/01/2022</td></tr>  
    <tr><td><b>Datos de entrega </b>Carrera 16A#12-04</td></tr>  
    <tr><td><b>Recibe </b>${cadena}</td></tr>   
    <tr><td><b>Total a pagar $ </b>50.000</td></tr> 
    <tr><td><b>Forma de pago </b>Contraentrega</td></tr> 
    </table>
    <div style="text-align: center;"><h2>¿Necesitas contactarnos?</h2></div><hr/>
    <div style="text-align: center;">
    <p style="font-size: 14px;">Puedes llamarnos a nuestra línea de servicio al cliente:</p> 
    <p style="font-size: 14px;"><b>Medellín: </b>360-89-70</p> 
    </div>
    <div style="background-color: whiteSmoke;">
    <p style="font-size: 12px; margin: auto;"><b>Políticas de garantía: </b>
    <br/>
    Para hacer valida la garantía de un producto el cliente deberá: <br/>
    Presentar ticket o factura que avale la compra del producto.</br>
    Presentar el producto completo con su empaque, accesorios, manual, drivers, etc.
    </p> 
    </div>
    <div style="background-color: white; height: 20px;">--</div> 
    <div style="background-color: black; height: 30px;">--</div>    
    </div>`
  });

  // transporter.sendMail(mailOptions, (error, info)=>{
  //   if(error){
  //     res.status(500).send(error.message);
  //   }else{
  //     res.status(200).send({ message: "Email enviado" });
  //   }

  // });    
  }
}

export default CartController;
