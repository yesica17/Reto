import * as express from "express";
import cors = require("cors");
import * as dotenv from "dotenv";
import { createConnection, Connection } from "typeorm";
// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require ("path")
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node TypeScript API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ]
    },
    apis: [`${path.join(__dirname, ".controllers/*.js")}`]
}

dotenv.config();
class App {
  public app: express.Application;
  public port: number;
  public connection: Connection; // TypeORM connection to the database

  // The constructor receives an array with instances of the controllers for the application and an integer to designate the port number.
  constructor(controllers: any[], port: number) {
    this.app = express();

    this.port = port;
    this.initializeModels();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private async initializeModels() {
    const connection = await createConnection();
    if (connection === undefined) {
      throw new Error("Error connecting to database");
    } // In case the connection failed, the app stops.
    connection.synchronize(); // this updates the database schema to match the models' definitions
    this.connection = connection; // Store the connection object in the class instance.
  }

  // Here we can add all the global middlewares for our application. (Those that will work across every contoller)

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  // Boots the application
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
