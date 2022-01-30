import * as express from "express";
import { User } from "../models/User";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../controllers/token";
import { UserContact } from "../models/UserContact";

class ContactController {
  public path = "/contact";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

    // Controller endpoints
    this.router.post(this.path, this.createContact);
    this.router.get(this.path + "/:id", this.getContact);
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

  //------------Create Contact-----------------
  //no esta registrando el id_user.....
  public async createContact(req: express.Request, res: express.Response) {
    try {
      const contactData = req.body;
      const contact = new UserContact();
      contact.state = contactData.state;
      contact.city = contactData.city;
      contact.adress = contactData.adress;
      const user = await User.findOne(contactData.users.id);
      contact.users = user;
      const users = await UserContact.findOne(contactData.users.id);

      if (users == null) {
        const savedContact = await contact.save();
        res.status(200).json(savedContact);
      } else {
        await UserContact.update(users.id, req.body);
        return res.status(200).send({ message: "Product updated correctly" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //---------------Get order---------------
  public async getContact(req: express.Request, res: express.Response) {
    const contact = await UserContact.findOne(req.params.id);
    return res.send(contact);
  }
}

export default ContactController;
